const config = {
    api: {
        url: process.env.REACT_APP_API_URL || 'http://127.0.0.1:5001',
        key: process.env.REACT_APP_API_KEY || 'default_api_key',
    },
    // Add other config options here
    environment: process.env.NODE_ENV || 'development',
};

export default config;