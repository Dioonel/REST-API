const express = require('express');
const path = require('path');
const router = express.Router();
const UsersService = require('./../services/users/usersService');
const boom = require('@hapi/boom');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const service = new UsersService();

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
    //     if(body?.username){
    //         const user = await service.find(body.username);                                          // Validates user existence
    //         if(user[0]?.password){
    //             const isMatch = await bcrypt.compare(body.password, user[0].password);               // Validates password
    //             if(isMatch){
    //                 res.status(202).json({
    //                     message: 'Logged in!',
    //                 });
    //             } else {
    //                 res.status(401).json({
    //                     message: 'Incorrect password.',
    //                 });
    //             } 
    //         } else {
    //             res.status(404).json({
    //                 message: 'User not found',
    //             })
    //         }
    //     } else {
    //         res.redirect('/login');
    //     }
    // } catch(err){
    //     next(err);
    // }
});

router.get('/:foo', (req, res) => {
    res.status(404).send('Route not found.');
});

module.exports = router;