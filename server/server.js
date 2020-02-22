const app = require('./config/express');
const config = require('./config/config');

// Initialize mongo
require('./config/mongoose');

// Initialize app and listen to port
app.listen(config.port, ()=> {
    console.log(`server is running from port ${config.port}`)
});
