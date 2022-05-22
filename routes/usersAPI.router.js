const boom = require('@hapi/boom');
const express = require('express');
const bcrypt = require('bcrypt');
const UsersService = require('../services/users/usersService');
const passport = require('passport');
const checkRoles = require('./../middlewares/authHandler');
const service = new UsersService();
const router = express.Router();

router.get('/', async (req, res, next) => {                                                         // GET all users
    try {
        const users = await service.find();
        res.json(users);
    } catch(err){
        next(err);
    }
});

router.post('/', async (req, res, next) => {                                                        // POST (create an user)
    try {
        let body = req.body;
        const hashPassword = await bcrypt.hash(body.password, 5);
        body.password = hashPassword;
        body = await service.create(body);
        res.status(201).json({
            message: 'User created!',
            username: body.username,
        });
    } catch(err){
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {                                                   // GET an user
    try {
        const id = req.params.id;
        const user = await service.findOne(id);
        if (user == null || user == undefined){
            throw boom.notFound('User not found.');
        } else {   
            res.json(user);
        }
    } catch(err){
        next(err);
    }
});

router.patch('/:id',
    passport.authenticate('jwt', {session: false}),
    checkRoles(['admin']),
    async (req, res, next) => {                                                     // PATCH, update an user
        try {
            const id = req.params.id;
            const body = req.body;
            const user = await service.update(id, body);
            res.json({
                message: 'User updated!',
                data: user,
            });
        } catch(err){
            next(err);
        }
});

router.delete('/:id',
    passport.authenticate('jwt', {session: false}),
    checkRoles(['admin']),
    async (req, res, next) => {                                                     // DELETE an user
        try {
            let id = req.params.id;
            id = await service.delete(id);
            if (id == null || id == undefined){
                res.json({message: 'User not found.'});
            } else {
                res.json({
                    message: 'User deleted.',
                    id: id
                });
            }
        } catch(err){
            next(err)
        }
});


module.exports = router;