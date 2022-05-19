const express = require('express');
const path = require('path');
const router = express.Router();
const boom = require('@hapi/boom');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/login.html'));
});

router.post('/',
    passport.authenticate('local', {session: false}),
    async (req, res, next) => {
        try {
            const user = req.user.user;
            const payload = {
                sub: user._id,
                role: user.role,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET);

            res.json({
                message: req.user.message,
                user,
                token,
            });
        } catch (err) {
            next(err);
        }
});

router.get('/:foo', (req, res) => {
    res.status(404).send('Route not found.');
});

module.exports = router;