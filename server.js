// require the express library
const express = require('express');
// require the json database
const notes = require('./db/db.json');
// requires the path library
const path = require('path');

// creates a conditional value for PORT that will either match the PORT used by the environment of the process that is running the server? or port 3001
const PORT = process.env.PORT || 3001;
// sets app to an instance of the express method
const app = express();

// Instructs the server to make files in provided path static resources
app.use(express.static('public'));
// parses incoming string or array data
app.use(express.urlencoded({extended: true}));
// parses incoming JSON data
app.use(express.json());

app.get('/', (req, res) => {
    // sends the html file to the / route
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
});



