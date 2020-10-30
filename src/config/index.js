var staging = true

const config = {
    REALM_APP_ID: 'pensify-realm-ehpya',
    GRAPHQL_URL:
        'https://realm.mongodb.com/api/client/v2.0/app/pensify-realm-ehpya/graphql',
    API_BASE_URL: staging
        ? 'http://localhost:5000/api/v1'
        : 'https://example.com/api/v1',

    GA_TRACKING_ID: staging ? 'UA-123456789-0' : 'UA-123456789-0',
    GOOGLE_OAUTH_CLIENT_ID:
        '602173608399-k0dq45qjc51j9l5l37kkahiv17fuh8t2.apps.googleusercontent.com',

    staging: staging,
}

export default config
