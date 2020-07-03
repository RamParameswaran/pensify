var staging = true

const config = {
    API_BASE_URL: staging
        ? 'http://localhost:5000/api/v1'
        : 'https://example.com/api/v1',

    GA_TRACKING_ID: staging ? 'UA-123456789-0' : 'UA-123456789-0',
    staging: staging,
}

export default config
