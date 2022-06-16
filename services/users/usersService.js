const boom = require('@hapi/boom');
const store = require('./usersStore');
const bcrypt = require('bcrypt');
const cartStore = require('./../carts/cartStore');

class UsersService {

    async create(data){
        if(!data){
            throw boom.badRequest("Can't post empty data.");
        }
        if(!data.password){
            throw boom.badRequest('Password not provided');
        }
        try {
            const hashedPassword = await bcrypt.hash(data.password, 5)
            const newData = {
                ...data,
                password: hashedPassword
            }

            let myUser = await store.add(newData);
            
            let myCart = await cartStore.cartInit(myUser._id);
            let fullUser = await store.update(myUser._id, {cart: myCart});

            fullUser = fullUser.toObject();
            delete fullUser.password;
            return fullUser;
        } catch (err) {
            throw boom.conflict('Please, try again later.');
        }       
    }

    async find(data = null){
        try {
            let filter = null;
            if(data){
                filter = data;
            }
            return await store.get(filter);
        } catch (err) {
            throw boom.conflict('Please, try again later.');
        }    
    }

    async findOne(id){
        try {
            return await store.getOne(id);
        } catch(err){
            throw boom.notFound('User not found.');
        }
    }

    async findUsername(username){
        try{
            return await store.getByUsername(username);
        } catch (err){
            throw boom.notFound('User not found.');
        }
    }

    async update(id, patch){
        try {
            return await store.update(id, patch);
        } catch (err){
            throw boom.badRequest('Invalid data.');
        }
    }

    async delete(id){
        try{
            return await store.delete(id);
        } catch (err) {
            throw boom.notFound('User not found.');
        }
    }




    async findMyCart(userId){
        try{
            let myUser = await this.findOne(userId);

            if(myUser._id){
                if(!myUser.cart){
                    let myCart = await cartStore.cartInit(myUser._id);
                    let fullUser = await store.update(myUser._id, {cart: myCart});
                    myUser = fullUser;
                }
                let response = await cartStore.getCart(myUser._id);
                let resolvedCart = {
                    ...response._doc,
                    subtotal: await response.subtotal,
                }
                return resolvedCart;
            } else {
                throw boom.notFound('User not found.');
            }
        } catch (err) {
            throw boom.conflict('Error getting a cart.');
        }
    }
}

module.exports = UsersService;