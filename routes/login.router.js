const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const router = express.Router();
const UserService = require('./../services/users/usersService');
const boom = require('@hapi/boom');

const service = new UserService();

router.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/login.html'));
});

router.post('/', async (req, res, next) => {
    try {
        let body = req.body;

        if(body?.username){
            const user = await service.find(body.username);                                          // Validates user existance
            if(user[0]?.password){
                const isMatch = await bcrypt.compare(body.password, user[0].password);               // Validates password
                if(isMatch){
                    res.status(202).json({
                        message: 'Logged in!',
                    });
                } else {
                    res.status(401).json({
                        message: 'Incorrect password.',
                    });
                } 
            } else {
                res.status(404).json({
                    message: 'User not found',
                })
            }
        } else {
            res.redirect('/login');
        }
    } catch(err){
        next(err);
    }
});

router.get('/:foo', (req, res) => {
    res.status(404).send('Route not found.');
});

module.exports = router;