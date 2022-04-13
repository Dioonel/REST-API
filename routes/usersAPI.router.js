const express = require('express');
const UsersService = require('../services/usersService');

const service = new UsersService();
const router = express.Router();

//router.get('/', (req, res) => {                                                       // HTML
//    res.sendFile(__dirname + '/client/users.html');
//});

router.get('/', (req, res, next) => {                                                         // GET all users
    try {
        const users = service.find();
        res.json(users);
    } catch(err){
        next(err)
    }
});

router.post('/', (req, res, next) => {                                                        // POST (create an user)
    try {
        let body = req.body;
        body = service.create(body);
        res.status(201).json({
            message: 'User created!',
            data: body,
        });
    } catch(err){
        next(err)
    }
});

router.get('/:id', (req, res, next) => {                                                   // GET an user
    try {
        const id = req.params.id;
        const user = service.findOne(id);
        res.json(user);
    } catch(err){
        next(err)
    }
});


router.patch('/:id', (req, res, next) => {                                                     // PATCH, update an user
    try {
        const id = req.params.id;
        const body = req.body;
        const user = service.update(id, body);
        res.json({
            message: 'User updated!',
            data: user,
        });
    } catch(err){
        next(err);
    }
});


router.delete('/:id', (req, res, next) => {                                                  // DELETE an user
    try {
        let id = req.params.id;
        id = service.delete(id);
        res.json({
            message: 'User deleted.',
            id: id
        });
    } catch(err){
        next(err)
    }
});


module.exports = router;