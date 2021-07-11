const fs = require('fs');
const path = require('path');


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
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notesArr, null, 2));
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
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notesArr, null, 2));
}

module.exports = {validateNotes, createNote, deleteNote};