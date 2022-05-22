const express = require('express');
const path = require('path');
const router = express.Router();
const passport = require('passport');
const AuthService = require('./../services/users/authService');

const service = new AuthService();

router.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/login.html'));
});

router.post('/',
    passport.authenticate('local', {session: false}),
    async (req, res, next) => {
        try {
            const user = req.user.user;
            const status = req.user.status;
            const token = service.signToken(user);

            res.cookie('token', token, {httpOnly: false});

            if(status === 200){
                res.json({
                    message: 'Logged in!',
                    user,
                    token,
                    status
                });
            }    
        } catch (err) {
            next(err);
        }
});

router.get('/:foo', (req, res) => {
    res.status(404).send('Route not found.');
});

module.exports = router;