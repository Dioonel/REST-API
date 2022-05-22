const express = require('express');
const path = require('path');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UsersService = require('./../services/users/usersService');

const service = new UsersService();

router.get('/', async (req, res, next) => {
    try {
        if (req?.cookies?.token){
            const payload = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            const user = await service.findOne(payload.sub);
            if(user){
                res.cookie('username', user.username, {httpOnly: false});
                res.sendFile(path.resolve('./public/users.html'));
            }
        } else {
            res.redirect('/login?user=false');
        }
    } catch (err){
        next(err)
    }
});

router.get('/:foo', (req, res) => {
    res.status(404).send('Route not found.')
});

module.exports = router;