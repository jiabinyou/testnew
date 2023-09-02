type LocalConstantsType = { [key: string]: string };

export const local_constants: LocalConstantsType = {
    //Key Collection
    CHIME_AUTH_TOKEN_KEY_PREFIX: '_aws_wt_session=',
    HOST_ALPHA: 'profile.id.ue1.a.app.chime.aws',
    HOST_GAMMA: 'profile.id.ue1.g.app.chime.aws',
    HOST_PROD: 'profile.id.ue1.app.chime.aws',
    PLATFORM: 'osx',
    DEVICE_TOKEN: '43ea8f9d-1921-437b-91d6-be88683f2ded',
    SERVICE_NAME:'ucprofile',
    PROFILE_PATH: '/profiles/',
    DEVICE_PATH: '/devices',

    //URL Collection
    SIGN_IN_URL_ALPHA: 'https://a.app.chime.aws/',
    SIGN_IN_URL: 'https://g.app.chime.aws/',

    EXPRESS_START_MEETING_URL_ALPHA: 'https://api.express.ue1.a.app.chime.aws/meetings/v2/meetings',
    EXPRESS_START_MEETING_URL: 'https://api.express.ue1.g.app.chime.aws/meetings/v2/meetings',

    EXPRESS_ADD_ATTENDEES_URL_PREFIX_ALPHA: 'https://api.express.ue1.a.app.chime.aws/meetings/v2/meetings/',
    EXPRESS_ADD_ATTENDEES_URL_PREFIX: 'https://api.express.ue1.g.app.chime.aws/meetings/v2/meetings/',
    EXPRESS_ADD_ATTENDEES_URL_PREFIX_PROD: 'https://api.express.ue1.app.chime.aws/meetings/v2/meetings/',
    EXPRESS_ADD_ATTENDEES_URL_SUFFIX: '/attendees',

    VALIDATION_URL_PREFIX_ALPHA: 'https://api.express.ue1.a.app.chime.aws/meetings_docshare/meetings/',
    VALIDATION_URL_PREFIX: 'https://api.express.ue1.g.app.chime.aws/meetings_docshare/meetings/',
    VALIDATION_URL_PREFIX_PROD: 'https://api.express.ue1.app.chime.aws/meetings_docshare/meetings/',
    VALIDATION_URL_SUFFIX: '/validate',

    GRANT_URL_PREFIX_ALPHA: 'https://api.express.ue1.a.app.chime.aws/meetings_docshare/meetings/',
    GRANT_URL_PREFIX: 'https://api.express.ue1.g.app.chime.aws/meetings_docshare/meetings/',
    GRANT_URL_PREFIX_PROD: 'https://api.express.ue1.app.chime.aws/meetings_docshare/meetings/',
    GRANT_URL_SUFFIX: '/grant',

    CONTENT_TYPE: 'application/json',
    ACCEPT_TYPE: 'application/json',

    //Test Users Information Collection
    EMAIL: 'chime-doc-share-gamma-02@amazon.com', //system user email: chime-doc-share-gamma-02@amazon.com
    USER_NAME: 'doc-share-gamma-02',
    PASS_WORD: 'y4tN8ZEK',
    PROFILE_ID_ALPHA_02: "58a44132-e9c1-43dd-91b9-745cfb91b301", //chime-doc-share-alpha-01@amazon.com
    PROFILE_ID_ALPHA_03: "03cbcb66-31c8-4969-aa6c-226bfd66a18b", //chime-doc-share-alpha-02@amazon.com
    PROFILE_ID_ALPHA_04: "203f3617-322e-4340-bf1c-61290d9ac613", //chime-doc-share-alpha-03@amazon.com
    PROFILE_ID_ALPHA_05: "3e22f7f9-6331-4372-b511-1f99067b1f0b", //chime-doc-share-alpha-04@amazon.com
    PROFILE_ID_ALPHA_06: "3df0e30c-5778-4149-aed4-7a08e08a5762", //chime-doc-share-alpha-05@amazon.com

    PROFILE_ID_GAMMA_02: 'e814620e-7381-4065-9795-10b84ffb951e', //system user email: chime-doc-share-gamma-02@amazon.com chime gamma profileid
    PROFILE_ID_GAMMA_03: '4eb4aa65-3b78-45cb-8546-42801c17a9c8', //system user email: chime-doc-share-gamma-03@amazon.com chime gamma profileid
    PROFILE_ID_GAMMA_04: 'f1cb65ac-1744-4a25-9975-5a2f16057ec8', //system user email: chime-doc-share-gamma-04@amazon.com chime gamma profileid
    PROFILE_ID_GAMMA_05: 'd9521eae-42b7-4000-b3b2-b9a2942fe3c8', //system user email: chime-doc-share-gamma-05@amazon.com chime gamma profileid
    PROFILE_ID_GAMMA_06: 'b3010415-ce10-4833-961e-908ede0b3dd9', //system user email: chime-doc-share-gamma-06@amazon.com chime gamma profileid

    PROFILE_ID_PROD_02: "b83e5369-46fc-405a-bb97-d889b83e5367", //chime-doc-share-prod-01@amazon.com
    PROFILE_ID_PROD_03: "35501238-9449-4255-b8a3-e80670d6f629", //chime-doc-share-prod-02@amazon.com
    PROFILE_ID_PROD_04: "d621760c-146a-4c81-bcec-86d2d911831d", //chime-doc-share-prod-03@amazon.com
    PROFILE_ID_PROD_05: "4fa2b26a-e80f-4c1e-8c5e-5ee2bb044b3d", //chime-doc-share-prod-04@amazon.com
    PROFILE_ID_PROD_06: "89710286-f1bd-4012-959f-c09d44f04510", //chime-doc-share-prod-05@amazon.com

    //Workdocs Resource Collection
    DOC_LINK_ALPHA: 'https://amazon.awsapps.com/workdocs/index.html#/document/2ffd7f87256fbc22a313b09b3b62c5f917dcf8aa861843179744e94c3afd0369',
    DOC_LINK: 'https://amazon.awsapps.com/workdocs/index.html#/document/641231eaca1793e7a67e348e2b3b3096e7dab5d712e7177e224458017bffc683',
    DOC_LINK_PROD: 'https://amazon.awsapps.com/workdocs/index.html#/document/91a7fb897e57227e3ef7ded592405587f65f64f2230ae5582a272e1817c5b81e',
    PROVIDER: 'WorkDocs',
    ACCESS_LEVEL_CONTRIBUTOR: 'CONTRIBUTOR',
    RESOURCE_ID: 'c328888fefb71555ffcaf4548e92bc71dbd0ec64123db042278c33496fae1674',
};
