import fetch from 'node-fetch';
import { local_constants } from '../constants/localConstants';
import TestContext from '../lib/TestContext';

const ADD_ATTENDEES_URL_SUFFIX = local_constants.EXPRESS_ADD_ATTENDEES_URL_SUFFIX;
const CONTENT_TYPE = local_constants.CONTENT_TYPE;

let PROFILE_ID_INVITEE_01: string;
let PROFILE_ID_INVITEE_02: string;
let PROFILE_ID_INVITEE_03: string;
let ADD_ATTENDEES_URL_PREFIX: string;
if (TestContext.stageName == 'prod') {
    PROFILE_ID_INVITEE_01 = local_constants.PROFILE_ID_PROD_04;
    PROFILE_ID_INVITEE_02 = local_constants.PROFILE_ID_PROD_05;
    PROFILE_ID_INVITEE_03 = local_constants.PROFILE_ID_PROD_06;
    ADD_ATTENDEES_URL_PREFIX = local_constants.EXPRESS_ADD_ATTENDEES_URL_PREFIX_PROD;
} else if(TestContext.stageName == 'gamma') {
    PROFILE_ID_INVITEE_01 = local_constants.PROFILE_ID_GAMMA_04;
    PROFILE_ID_INVITEE_02 = local_constants.PROFILE_ID_GAMMA_05;
    PROFILE_ID_INVITEE_03 = local_constants.PROFILE_ID_GAMMA_06;
    ADD_ATTENDEES_URL_PREFIX = local_constants.EXPRESS_ADD_ATTENDEES_URL_PREFIX;
} else {  //alpha and dev stage
    PROFILE_ID_INVITEE_01 = local_constants.PROFILE_ID_ALPHA_04;
    PROFILE_ID_INVITEE_02 = local_constants.PROFILE_ID_ALPHA_05;
    PROFILE_ID_INVITEE_03 = local_constants.PROFILE_ID_ALPHA_06;
    ADD_ATTENDEES_URL_PREFIX = local_constants.EXPRESS_ADD_ATTENDEES_URL_PREFIX_ALPHA;
}

export async function addAttendees(token: string, id: string){
    try {
        console.log('start invite remaining users.');
        const url = ADD_ATTENDEES_URL_PREFIX + id + ADD_ATTENDEES_URL_SUFFIX;
            await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                Invitees:[
                    {
                        ProfileId:PROFILE_ID_INVITEE_01,
                        PhoneNumber:null,
                    },
                    {
                        ProfileId:PROFILE_ID_INVITEE_02,
                        PhoneNumber:null,
                    },
                    {
                        ProfileId:PROFILE_ID_INVITEE_03,
                        PhoneNumber:null,
                    }
                ]
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
                console.log(response.status);
                if (response.status == 200) {
                    console.log('All users invited succeed');
                }
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
