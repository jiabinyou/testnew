import { config } from "aws-sdk";

export async  function getCredentials(){
    /**
     * For Hydra Pipeline test: The ENV variables, AWS_ACCESS_KEY_ID,
     * AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN will be provided automatically.
     */
    let credentials;
    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && process.env.AWS_SESSION_TOKEN) {
        credentials = {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            sessionToken: process.env.AWS_SESSION_TOKEN
        };
    } else {
        /**
         * For local testing: Get the credentials from ~/.aws/credentials,
         * which is usually updated through ada credential update.
         */
        credentials = config.credentials;
    }
    return credentials
}
