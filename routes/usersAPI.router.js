const express = require('express');
const UsersService = require('../services/usersService');

const service = new UsersService();
const router = express.Router();

router.get('/', async (req, res, next) => {                                                         // GET all users
    try {
        const users = await service.find();
        res.json(users);
    } catch(err){
        next(err)
    }
});

router.post('/', async (req, res, next) => {                                                        // POST (create an user)
    try {
        let body = req.body;
        body = await service.create(body);
        res.status(201).json({
            message: 'User created!',
            data: body,
        });
    } catch(err){
        next(err)
    }
});

router.get('/:id', async (req, res, next) => {                                                   // GET an user
    try {
        const id = req.params.id;
        const user = await service.findOne(id);
        res.json(user);
    } catch(err){
        next(err)
    }
});

router.patch('/:id', async (req, res, next) => {                                                     // PATCH, update an user
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

router.delete('/:id', async (req, res, next) => {                                                  // DELETE an user
    try {
        let id = req.params.id;
        id = await service.delete(id);
        res.json({
            message: 'User deleted.',
            id: id
        });
    } catch(err){
        next(err)
    }
});


module.exports = router;