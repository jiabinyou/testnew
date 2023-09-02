import fetch from 'node-fetch';
import { local_constants } from '../constants/localConstants';
import TestContext from '../lib/TestContext';

const CONTENT_TYPE = local_constants.CONTENT_TYPE;
const ACCEPT_TYPE = local_constants.ACCEPT_TYPE;
let START_MEETING_URL: string;
let PROFILE_ID_SYSTEM_USER: string;
if (TestContext.stageName == 'prod') {
    START_MEETING_URL = local_constants.EXPRESS_START_MEETING_URL_PROD;
    PROFILE_ID_SYSTEM_USER = local_constants.PROFILE_ID_PROD_03;
} else if(TestContext.stageName == 'gamma') {
    START_MEETING_URL = local_constants.EXPRESS_START_MEETING_URL;
    PROFILE_ID_SYSTEM_USER = local_constants.PROFILE_ID_GAMMA_03;
} else {  //alpha and dev stage
    START_MEETING_URL = local_constants.EXPRESS_START_MEETING_URL_ALPHA;
    PROFILE_ID_SYSTEM_USER = local_constants.PROFILE_ID_ALPHA_03;
}

export async function startGroupMeeting(token : string) {
    try {
        console.log('Group Meeting start.');
        const url = START_MEETING_URL;
        const profileid = PROFILE_ID_SYSTEM_USER;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                Locked: true,
                GenerateUniquePin: true,
                PersonToPerson: true,
                Invitees: [{ProfileId: profileid, PhoneNumber: null}]
            }),
            headers: {
                'Content-Type': CONTENT_TYPE,
                'Accept': ACCEPT_TYPE,
                'X-Chime-Auth-Token': token,
            },
        })
        return response.json();
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        } else {
            return 'An unexpected error occurred';
        }
    }
}
