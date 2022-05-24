const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/my-profile.html'));
});

router.get('/:foo', (req, res) => {
    res.status(404).send('Route not found.');
});

module.exports = router;