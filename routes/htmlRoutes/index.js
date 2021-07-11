const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
    // sends the index.html file to the / route
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});
router.get('/notes', (req, res) => {
    // sends the notes.html file to the /notes route
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// be sure to keep catch all route as last route
router.get('*', (req, res) => {
    // sends the index.html file when an undefined route/url is given
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;