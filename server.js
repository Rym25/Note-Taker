// require the express library
const express = require('express');
// require the json database
const notes = require('./db/db.json');
// requires the path library
const path = require('path');
// requires the fs library
const fs = require('fs');

// creates a conditional value for PORT that will either match the PORT used by the environment of the process that is running the server? or port 3001
const PORT = process.env.PORT || 3001;
// sets app to an instance of the express method
const app = express();

// Instructs the server to make files in provided path static resources
app.use(express.static('public'));
// parses incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parses incoming JSON data
app.use(express.json());

// SECTION FOR FUNCTIONS START

// Function to validate the given data
function validateNotes(note) {
    // this function will return false when a defined quality of the data is not present
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

function createNote(note, notesArr) {
    // console logs the passed in note
    console.log(note);
    // adds the passed in note to the passed in notesArr
    notesArr.push(note);
    // writes the newly altered notesArr to the db.json file
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notesArr, null, 2));
}

// function for deleting data from db.json
function deleteNote(id, notesArr) {
    // if the id passed in is a string the id will be converted to an interger number
    if(typeof id === 'string') {
        id = parseInt(id);
    }
    // since our ids are equal to the index can splice the notes array starting at the idth index
    notesArr.splice(id, 1);
    // have to reassign id values for the rest of the data
    for (let i = 0; i < notesArr.length; i++) {
        notesArr[i].id = `${i}`;
    }
    // writes the new array without deleted element and updated ids
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notesArr, null, 2));
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
    // sends the json data in db.json to /api/notes
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    // adds an id to the post data based on the length of the db.json data
    req.body.id = notes.length.toString();
    // checks if the post data is formatted correctly if not will send a 400 error
    if (!validateNotes(req.body)) {
        res.status(400).send('The note is not properly formatted');
    } else {
        // writes post data to db.json the sends new json data as a response
        createNote(req.body, notes);
        res.json(notes);
    }
});

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, notes);
    res.json(notes);
})

// be sure to keep catch all route as last route
app.get('*', (req, res) => {
    // sends the index.html file when an undefined route/url is given
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
});

// http://localhost:3001/api/notes

// https://peaceful-reef-11603.herokuapp.com/

