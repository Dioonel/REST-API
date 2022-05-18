const boom = require('@hapi/boom');
const store = require('./usersStore');

class UsersService {

    async create(user){
        if(!user){
            throw boom.badRequest("Can't post empty data.")
        }
        try {
            return await store.add(user);
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