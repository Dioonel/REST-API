const express = require('express');
const path = require('path');
const router = express.Router();
const passport = require('passport');

router.get('/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        res.sendFile(path.resolve('./public/timeline.html'));
});

router.get('/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        res.sendFile(path.resolve('./public/detailed-post.html'));
});

module.exports = router;