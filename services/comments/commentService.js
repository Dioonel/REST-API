const boom = require('@hapi/boom');
const store = require('./commentStore');

class CommentsService {

    async create(userId, postId, text){
        try{
            if(!text?.text || !userId || !postId){
                throw boom.badRequest("[Comment Service] - Can't post empty data.");
            }

            let comment = {                                                                            // Creates a comment object
                author: userId,
                post: postId,
                text: text.text,
            }

            let myComment = await store.add(comment);
            return myComment;
        } catch (err) {
            throw boom.conflict('[Comment Service] - Unexpected error.');
        }       
    }
    

    async update(userId, commentId, patch){
        try {
            let myComment = await store.getOne(commentId);

            if(userId == String(myComment.author)){                                                     // Validates user owning that comment
                if(patch?.text){                                                                        // Validates data format
                    return await store.update(commentId, patch);
                } else {
                    throw boom.badRequest('[Comment Service] - Wrong data.');
                }     
            } else {
                throw boom.unauthorized('[Comment Service] - You are not the owner of this comment.');
            }
        } catch (err){
            throw boom.conflict('[Comment Service] - Unexpected error.');
        }
    }


    async delete(userId, commentId){
        try{
            let myComment = await store.getOne(commentId);

            if(userId == String(myComment.author)){                                                     // Validates user owning that comment
                console.log('??');
                return await store.delete(commentId);
            } else {
                throw boom.unauthorized('[Comment Service] - You are not the owner of this comment.');
            }
        } catch (err) {
            throw boom.notFound('[Comment Service] - Comment not found.');
        }
    }
}

module.exports = CommentsService;