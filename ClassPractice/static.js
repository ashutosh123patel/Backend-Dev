const express = require('express');
const app = express();

// Serve files from the 'public' director
//Absolute Path: c\user\desktop\filename
//Relative Path: ./public[the folder in which the html , cvss and js files are present]

//const staticPath =__dirname+"/public"
app.use(express.static('public'));
app.listen(3000, () => {
console.log('Server running on port 3000');
});

