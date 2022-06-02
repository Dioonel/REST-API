const boom = require('@hapi/boom');
const store = require('./postingStore');

class PostingsService {

    async create(data){
        if(!data){
            throw boom.badRequest("Can't post empty data.");
        }
        try{
            let myPost = await store.add(data);
            return myPost;
        } catch (err) {
            throw boom.conflict('[controlador de posts] error al crear post');
        }       
    }

    async find(){
        try{
            return await store.get();
        } catch (err) {
            throw boom.conflict('[controlador de posts] error al obtener posts');
        }    
    }

}

module.exports = PostingsService;