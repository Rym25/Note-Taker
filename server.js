// require the express library
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

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
// middleware that says whenever a path from the apiRoutes is used tack /api on the front of the path
app.use('/api',apiRoutes);
// middleware that says whenever a path from the htmlRoutes is used start the path from the base /
app.use('/', htmlRoutes);


// runs the server on the given port
app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
});

// Server will run at either

// http://localhost:3001/

// or

// https://peaceful-reef-11603.herokuapp.com/

