const express = require('express');
const path = require('path');
const port = process.env.PORT || 4100;


// get app 
const app = express();

const destDir = path.join(__dirname, '../dist');

// hosting from dist folder
app.use(express.static(destDir));
console.log(`express hosting from ${destDir}`);

// serving index.html
app.get('*', (req, res) => {
	res.sendfile(path.join(destDir, 'index.html'));
})

// initialize app and listen to port
app.listen(port, ()=> {
    console.log(`server is running from port ${config.port}`)
});
