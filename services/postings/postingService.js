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

    async findOne(id){
        try{
            if(!id){
                throw boom.conflict('no metiste ID aweonado');
            }
            return await store.getOne(id);
        } catch (err){
            throw boom.conflict('[controlador de posts] error al obtener un post por id');
        }
    } 

    async update(id, patch){
        try {
            return await store.update(id, patch);
        } catch (err){
            throw boom.badRequest('[controlador de posts] error en la sintaxis al actualizar un post');
        }
    }

    async delete(id){
        try{
            return await store.delete(id);
        } catch (err) {
            throw boom.notFound('[controlador de posts] id no encontrada');
        }
    }
}

module.exports = PostingsService;