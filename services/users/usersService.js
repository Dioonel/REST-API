const boom = require('@hapi/boom');
const store = require('./usersStore');
const bcrypt = require('bcrypt');

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
            
            myUser = myUser.toObject();
            delete myUser.password;
            return myUser;
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
}

module.exports = UsersService;