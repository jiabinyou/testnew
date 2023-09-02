import fetch from 'node-fetch';
import { local_constants } from '../constants/localConstants';
import TestContext from '../lib/TestContext';

const ACCESS_LEVEL_CONTRIBUTOR = local_constants.ACCESS_LEVEL_CONTRIBUTOR;
const GRANT_URL_SUFFIX = local_constants.GRANT_URL_SUFFIX;
const CONTENT_TYPE = local_constants.CONTENT_TYPE;
const PROVIDER = local_constants.PROVIDER;
let GRANT_URL_PREFIX: string;
let DOC_LINK: string;
if (TestContext.stageName == 'prod') {
    GRANT_URL_PREFIX = local_constants.GRANT_URL_PREFIX_PROD;
    DOC_LINK = local_constants.DOC_LINK_PROD;
} else if(TestContext.stageName == 'gamma') {
    GRANT_URL_PREFIX = local_constants.GRANT_URL_PREFIX;
    DOC_LINK = local_constants.DOC_LINK;
} else {  //alpha and dev stage
    GRANT_URL_PREFIX = local_constants.GRANT_URL_PREFIX_ALPHA;
    DOC_LINK = local_constants.DOC_LINK_ALPHA;
}

export async function startGrantAccess(token: string, meetingId: string, roomId: string){
    try {
        console.log('workdoc grant access process start.')
        const url = GRANT_URL_PREFIX + meetingId + GRANT_URL_SUFFIX;
        jest.setTimeout(1000000);
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                provider: PROVIDER,
                docLink: DOC_LINK,
                accessLevel: ACCESS_LEVEL_CONTRIBUTOR,
                chatRoomId: roomId,
            }),
            headers: {
                'Content-Type': CONTENT_TYPE,
                'x-chime-auth-token':token,
            },
        }).then( (response) => {
                if (!response.ok) {
                    throw new Error(`Error! status: ${response.status}`);
                }
                const result = (response.json());
                const code = response.status;
                console.log('grant lambda response code is:' + code);
                if (response.status == 200) {
                    console.log('workdoc access verification succeed');
                } else {
                    console.log('grant lambda response code is not 200, please notice the error message!');
                }
                expect(code).toEqual(200);

                return result;
            }
        )
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        } else {
            return 'An unexpected error occurred';
        }
    }
}
