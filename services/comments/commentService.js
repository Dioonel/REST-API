const boom = require('@hapi/boom');
const store = require('./commentStore');

class CommentsService {

    async create(userId, postId, text){
        try{
            if(!text?.text || !userId || !postId){
                throw boom.badRequest("Can't post empty data.");
            }

            let comment = {
                author: userId,
                post: postId,
                body: text.text,
            }

            let myComment = await store.add(comment);
            return myComment;
        } catch (err) {
            throw boom.conflict('[controlador de comentarios] error al crear un comentario');
        }       
    }

    async update(userId, commentId, patch){
        try {
            let myComment = await store.getOne(commentId);
            console.log(myComment);
            if(userId == String(myComment.author)){
                if(patch?.body){
                    return await store.update(commentId, patch);
                } else {
                    throw boom.badRequest('[controlador de comentarios] ???????');
                }     
            } else {
                throw boom.unauthorized('[controlador de comentarios] no puedes actualizar un comentario si no eres el creador del mismo');
            }
        } catch (err){
            throw boom.badRequest('[controlador de comentarios] error en la sintaxis al actualizar un comentario');
        }
    }

    async delete(userId, commentId){
        try{
            let myComment = await store.getOne(commentId);
            if(userId == String(myComment.author)){
                return await store.delete(myComment);
            } else {
                throw boom.unauthorized('[controlador de comentarios] no puedes eliminar un comentario si no eres el creador del mismo');
            }
        } catch (err) {
            throw boom.notFound('[controlador de comentarios] id no encontrada');
        }
    }
}

module.exports = CommentsService;