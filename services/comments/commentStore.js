const Model = require('./commentModel');
const boom = require('@hapi/boom');
const postingModel = require('../postings/postingStore');

async function addComment(comment){
    try{
        const myComment = new Model(comment);
        let newComment = await myComment.save();

        return await postingModel.addComment(newComment.post, newComment);
    } catch (err) {
        throw boom.internal('error al añadir un comentario');
    }
}

async function getOneComment(id){
    try{
        return await Model.findById(id);
    } catch (err){
        throw boom.internal('error al buscar un comentario por id');
    }
}

async function updateComment(id, patch){
    try{
        let updatedComment = await Model.findByIdAndUpdate(id, patch, { runValidators: true, new: true });
        return updatedComment;
    } catch (err){
        throw boom.internal('error al actualizar un comentario');
    }
}

async function deleteComment(comment){
    try{
        if(!comment || !comment._id){
            throw boom.notFound('comentario no existe qliao');
        }

        let deletedComment = await Model.findByIdAndDelete(comment._id);
        return await postingModel.deleteComment(comment.post, comment._id);
            
    } catch (err){
        throw boom.internal('error al eliminar un comentario');
    }
}

module.exports = {
    add: addComment,
    getOne: getOneComment,
    update: updateComment,
    delete: deleteComment,
}