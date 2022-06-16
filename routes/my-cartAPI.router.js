const boom = require('@hapi/boom');
const express = require('express');
const UsersService = require('../services/users/usersService');
const CartService = require('./../services/carts/cartService');
const passport = require('passport');
const checkRoles = require('./../middlewares/authHandler');
const userService = new UsersService();
const cartService = new CartService();
const router = express.Router();

router.get('/',
    passport.authenticate('jwt', {session: false, failureRedirect: '/login?user=false'}),
    async (req, res, next) => {
        try {
            const myCart = await userService.findMyCart(req.user.sub);
            res.json(myCart);
        } catch(err){
            next(err);
        }
});

router.post('/',
    passport.authenticate('jwt', {session: false, failureRedirect: '/login?user=false'}),
        async (req, res, next) => {
            try {
                let { productId, amount } = req.body;
                if(productId){
                    const myCart = await userService.findMyCart(req.user.sub);

                    const response = await cartService.push(myCart._id, productId, amount);
                    
                    res.json(response);
                } else {
                    res.json({message: 'Missing data'});
                }
            } catch(err){
                next(err);
            }
});

router.delete('/empty',
    passport.authenticate('jwt', {session: false, failureRedirect: '/login?user=false'}),
        async (req, res, next) => {
            try {
                const myCart = await userService.findMyCart(req.user.sub);
                const response = await cartService.empty(myCart);

                res.json(response);
            } catch (err) {
                next(err);
            }
});

router.delete('/:itemId',
    passport.authenticate('jwt', {session: false, failureRedirect: '/login?user=false'}),
        async (req, res, next) => {
            try {
                let { itemId } = req.params;
                if (itemId){
                    const myCart = await userService.findMyCart(req.user.sub);

                    const response = await cartService.pop(myCart._id, itemId);

                    res.json(response);
                } else {
                    res.json({message: 'Missing data'});
                }
            } catch (err) {
                next(err);
            }
});


module.exports = router;