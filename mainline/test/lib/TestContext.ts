import * as AWS from 'aws-sdk';
import { ECSCredentials, SharedIniFileCredentials, config } from 'aws-sdk';
import { execSync } from 'child_process';

export default class TestContext {
    static pipelineNonProdStages = ['alpha', 'beta', 'gamma'];


    //Environment variable and configurations.

    static awsRegion = process.env.AWS_REGION || 'us-east-1';
    static stageName = process.env.stageName || execSync('whoami').toString().trim();

    //
    // AWS clients.
    //
    private static _lambda: AWS.Lambda;
    private static _workdocs: AWS.WorkDocs;

    static get lambda() {
        return TestContext._lambda;
    }

    static get workdocs() {
        return TestContext._workdocs;
    }

    static async workdocs_init() {
        var sts = new AWS.STS();
        // Assuming role for workdocs in alpha
        const response = await sts
            .assumeRole({
                //temporarily use alpha arn, will replace with role specifically for integration test once obtained from workdocs side.
                RoleArn: 'arn:aws:iam::289497978546:role/Role_WorkDocs_ChimeDocShare_Trust_INTEG',
                RoleSessionName: 'Lambda-Test-Session',
            })
            .promise();
        const credentials = response.Credentials;

        TestContext._workdocs = new AWS.WorkDocs({
            region: 'us-west-2',
            accessKeyId: credentials.AccessKeyId,
            secretAccessKey: credentials.SecretAccessKey,
            sessionToken: credentials.SessionToken,
        });
    }


    /**
     * Initialize Isnegard credential.
     * Use ECS credential in pipeline; use ADA to fetch Admin credentail in local env.
     */
    static async init() {
        if (this.pipelineNonProdStages.includes(TestContext.stageName)) {

            TestContext._lambda = new AWS.Lambda({
                apiVersion: '2015-03-31',
                region: TestContext.awsRegion,

                // NOTE: only use ECSCredentials provider in pipeline, this is very important.
                credentials: new ECSCredentials(),
            });
        } else {
            // Get credentials from ADA when running test locally.
            execSync(
                'ada credentials update --provider isengard --account 347690955157 --profile jest --role Admin --once'
            );
            const credentials = new SharedIniFileCredentials({ profile: 'jest' });

            // Update the default credentials to talk to AWS services.
            config.credentials = credentials;

            TestContext._lambda = new AWS.Lambda({
                apiVersion: '2015-03-31',
                region: TestContext.awsRegion,
            });
        }
    }
}
