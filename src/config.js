const config = {
    api: {
	    url: process.env.REACT_APP_API_URL || 'http://192.168.1.8:8001',
        key: process.env.REACT_APP_API_KEY || 'default_api_key',
    },
    // Add other config options here
    environment: process.env.NODE_ENV || 'development',
};

export default config;
