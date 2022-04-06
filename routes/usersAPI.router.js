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

router.post('/', (req, res, next) => {                                                        // POST (create a user)
    try {
        let body = req.body;
        body = service.create(body);
        res.status(201).json({
            message: 'Created!',
            data: body,
        });
    } catch(err){
        next(err)
    }
});

router.get('/:id', (req, res, next) => {                                                   // GET a user
    try {
        const id = req.params.id;
        const user = service.findOne(id);
        res.json(user);
    } catch(err){
        next(err)
    }
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


router.delete('/:id', (req, res, next) => {                                                  // DELETE a user
    try {
        let id = req.params.id;
        id = service.delete(id);
        res.json({
            message: id,
        });
    } catch(err){
        next(err)
    }
});


module.exports = router;