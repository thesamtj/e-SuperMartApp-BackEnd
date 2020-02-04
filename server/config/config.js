require('dotenv').config();
const envVars = process.env;

module.exports = {
    port: envVars.PORT,
    env: envVars.NODE_ENV,
    mongo: {
        uri: envVars.MONGODB_URI,
        port: envVars.MONGODB_PORT,
        isDebug: envVars.MONGODB_DEBUG
    }
    
};

