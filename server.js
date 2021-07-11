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

// SECTION FOR FUNCTIONS START

// Function to validate the given data
function validateNotes(note) {
    // this function will return false when a defined quality of the data is not present
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if(!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
} 

// SECTION FOR FUNCTIONS END

app.get('/', (req, res) => {
    // sends the index.html file to the / route
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
    // sends the notes.html file to the /notes route
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    // add validation for recieved data
    // add function to give new data an id
    // add ability to write new data to db.json
    if(!validateNotes(req.body)) {
        res.status(400).send('The note is not properly formatted');
    } else {
    console.log(req.body);
    res.json(req.body);
    }
});

// be sure to keep catch all route as last route
app.get('*', (req, res) => {
    // sends the index.html file when an undefined route/url is given
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
});

// http://localhost:3001/api/notes

