const app = require('./config/express');
const config = require('./config/config');

// initialize mongo
require('./config/mongoose');

// initialize app and listen to port
app.listen(config.port, ()=> {
    console.log(`server is running from port ${config.port}`)
});
