// require the express library
const express = require('express');
// require the json database
const notes = require('./db/db.json');

// creates a conditional value for PORT that will either match the PORT used by the environment of the process that is running the server? or port 3001
const PORT = process.env.PORT || 3001;
// sets app to an instance of the express method
const app = express();

// parses incoming string or array data
app.use(express.urlencoded({extended: true}));
// parses incoming JSON data
app.use(express.json());

app.get('/', (req, res) => {
    let results = notes;
    res.json(results);
})

app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
});



