const {validateNotes, createNote, deleteNote} = require('../../lib/notesAPI');
const router = require('express').Router();
const notes = require('../../db/db.json');

router.get('/notes', (req, res) => {
    // sends the json data in db.json to /api/notes
    res.json(notes);
});

router.post('/notes', (req, res) => {
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

router.delete('/notes/:id', (req, res) => {
    deleteNote(req.params.id, notes);
    res.json(notes);
})

module.exports = router;