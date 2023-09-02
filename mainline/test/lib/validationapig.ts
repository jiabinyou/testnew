import fetch from 'node-fetch';
import { ValidationResponse } from "../models/ValidationResponse";
import { local_constants } from '../constants/localConstants';
import TestContext from '../lib/TestContext';

const VALIDATION_URL_SUFFIX = local_constants.VALIDATION_URL_SUFFIX;
const CONTENT_TYPE = local_constants.CONTENT_TYPE;
let VALIDATION_URL_PREFIX: string;
let DOC_LINK: string;
if (TestContext.stageName == 'prod') {
    VALIDATION_URL_PREFIX = local_constants.VALIDATION_URL_PREFIX_PROD;
    DOC_LINK = local_constants.DOC_LINK_PROD;
} else if(TestContext.stageName == 'gamma') {
    VALIDATION_URL_PREFIX = local_constants.VALIDATION_URL_PREFIX;
    DOC_LINK = local_constants.DOC_LINK;
} else {  //alpha and dev stage
    VALIDATION_URL_PREFIX = local_constants.VALIDATION_URL_PREFIX_ALPHA;
    DOC_LINK = local_constants.DOC_LINK_ALPHA;
}

export async function startValidation(token: string, id: string){
    try {
        console.log('workdoc access validation process start.')
        const url = VALIDATION_URL_PREFIX + id + VALIDATION_URL_SUFFIX;
        jest.setTimeout(1000000);
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                provider:'WorkDocs',
                docLink:DOC_LINK,
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
                console.log('validation lambda response code is:' + code);
                if (response.status == 200) {
                    console.log('workdoc access verification succeed');
                } else {
                    console.log('validation lambda response code is not 200, please notice the error message!');
                }
                expect(code).toEqual(200);
                return result;
            }
        ).then((result)=> {
                console.log('the link sharing user access level information showed below')
                let jsonObj: ValidationResponse = JSON.parse(JSON.stringify(result));
                console.log(jsonObj);
            }
        );
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        } else {
            return 'An unexpected error occurred';
        }
    }
}
