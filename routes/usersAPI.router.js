const express = require('express');
const faker = require('faker');
const UsersService = require('../services/usersService');

const service = new UsersService();
const router = express.Router();

//router.get('/', (req, res) => {                                                       // HTML
//    res.sendFile(__dirname + '/client/users.html');
//});

router.get('/', (req, res) => {                                                         // GET all users
    const users = service.find();
    res.json(users);
});

router.post('/', (req, res) => {                                                        // POST (create a user)
    let body = req.body;
    body = service.create(body);
    res.status(201).json({
        message: 'Created!',
        data: body,
    });
});


router.get('/:id', (req, res) => {                                                   // GET a user
    const id = req.params.id;
    const user = service.findOne(id);
    res.json(user);
});


router.patch('/:id', (req, res) => {                                                   // PATCH (not supported rn)
    const id = req.params.id;
    let body = req.body;
    res.json({
        message: 'Updated!',
        data: body,
        id,
    });
});


router.delete('/:id', (req, res) => {                                                  // DELETE a user
    let id = req.params.id;
    id = service.delete(id);
    res.json({
        message: id,
    });
});


module.exports = router;