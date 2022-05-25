const express = require('express');
const path = require('path');
const router = express.Router();
const passport = require('passport');

router.get('/',
    passport.authenticate('jwt', {session: false, failureRedirect: '/login?user=false'}),
    (req, res) => {
        res.sendFile(path.resolve('./public/users.html'));
    }
);

router.get('/:foo', (req, res) => {
    res.status(404).send('Route not found.')
});

module.exports = router;