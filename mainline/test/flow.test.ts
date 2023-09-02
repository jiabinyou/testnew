import { startGroupMeeting } from './lib/startmeeting';
import { addAttendees } from './lib/addAttendees';
import { startValidation} from './lib/validationapig';
import { startGrantAccess } from './lib/grantapig';
import { config } from 'aws-sdk';
import { local_constants } from './constants/localConstants';
import TestContext from './lib/TestContext';
import { registerDevice } from './clients/profileServiceClient';

const AUTH_TOKEN_PREFIX = local_constants.CHIME_AUTH_TOKEN_KEY_PREFIX;
const RESOURCE_ID = local_constants.RESOURCE_ID;
let PROFILE_ID_02: string;
if (TestContext.stageName == 'prod') {
    PROFILE_ID_02 = local_constants.PROFILE_ID_PROD_02;
} else if(TestContext.stageName == 'gamma') {
    PROFILE_ID_02 = local_constants.PROFILE_ID_GAMMA_02;
} else {  //alpha and dev stage
    PROFILE_ID_02 = local_constants.PROFILE_ID_ALPHA_02;
}

describe('Chime doc share tests start', () => {

    beforeAll(async () => {
        config.region = "us-east-1";
        // await TestContext.init();
        // await TestContext.workdocs_init();
    });

    it('Invoke doc share validation lambda, check the response', async () => {
        if (TestContext.stageName != 'beta') {  //skip test on beta stage

            console.log('start registerDevice');
            let AUTH_TOKEN_CONTENT = '';
            await registerDevice(PROFILE_ID_02).then(data => {
                AUTH_TOKEN_CONTENT = JSON.parse(data).SessionToken; //data is String type, need to be parsed by JSON before read out
            });
            console.log('wait registerDevice response');

            const CHIME_AUTH_TOKEN_KEY = AUTH_TOKEN_PREFIX + AUTH_TOKEN_CONTENT;
            console.log('The X-Chime-Auth-Token will be used as session token in the following workflow');

            let CONFERENCE_ID = '';
            let CHAT_ROOM_ID = '';
            await startGroupMeeting(CHIME_AUTH_TOKEN_KEY).then(data => {
                console.log('Meeting detailed information included the data'); // JSON data parsed by `data.json()` call
                console.log('Meeting id is:' + data['Meeting']['JoinableMeeting']['Id']);
                CONFERENCE_ID = data['Meeting']['JoinableMeeting']['Id'];
                console.log('ChatRoomId id is:' + data['Meeting']['ChatRoom']['ChatRoomId']);
                CHAT_ROOM_ID = data['Meeting']['ChatRoom']['ChatRoomId'];
            });

            await addAttendees(CHIME_AUTH_TOKEN_KEY, CONFERENCE_ID);
            await startValidation(CHIME_AUTH_TOKEN_KEY, CONFERENCE_ID);
            await startGrantAccess(CHIME_AUTH_TOKEN_KEY, CONFERENCE_ID, CHAT_ROOM_ID);

            await removePermission(RESOURCE_ID);
        }
    });
});

async function removePermission(resourceId: string) {
    try {
        console.log('start remove all workdoc access (except doc owner)');
        const workDocsClient = TestContext.workdocs;
        const workdocsResponse = await workDocsClient.removeAllResourcePermissions(
            {
                ResourceId: resourceId,
            }
        )
            .promise();
        console.log('waiting for next round test started');
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        } else {
            return 'An unexpected error occurred';
        }
    }
}
