const Model = require('./postingModel');
const boom = require('@hapi/boom');

async function addPost(post){
    try{
        const myPost = new Model(post);
        return await myPost.save();
    } catch (err) {
        throw boom.internal('error al añadir post');
    }
}

async function getPosts(){
    try{
        return await Model.find()
        .select(['-__v'])
        .populate({path: 'seller', select: 'username'})
        .populate({path: 'product', select: 'name price image'})
        .populate({path: 'comments', model: 'comments', select: 'author body', populate: {path: 'author', model: 'users', select: 'username image'}})
        .exec();
    } catch (err) {
        throw boom.internal('error al obtener posts');
    }
}

async function getOnePost(id){
    try{
        return await Model.findById(id)
        .select(['-__v'])
        .populate({path: 'seller', select: 'username first_name last_name image contact'})
        .populate({path: 'product', select: 'name price image'})
        .populate({path: 'comments', select: 'author body', populate: {path: 'author', model: 'users', select: 'username image'}})
        .exec();
    } catch(err) {
        throw boom.internal('error al obtener un post por id');
    }
}

async function updatePost(id, patch){
    try{
        return await Model.findByIdAndUpdate(id, patch, { runValidators: true, new: true })
        .select(['-__v'])
        .populate({path: 'seller', select: 'username'})
        .populate({path: 'product', select: 'name price image'})
        .populate({path: 'comments', select: 'author body'})
        .exec();
    } catch (err){
        throw boom.internal('error al actualizar un post');
    }
}

async function deletePost(id){
    try{
        return await Model.findByIdAndDelete(id)
    } catch (err){
        throw boom.internal('error al eliminar un post');
    }
}

async function addCommentToPost(id, comment){
    try{
        return await Model.findByIdAndUpdate(id, {$push: { comments: comment }}, { runValidators: true, new: true });
    } catch (err) {
        throw boom.internal('BOOM');
    }
}

async function deleteCommentFromPost(id, commentId){
    try{
        return await Model.findByIdAndUpdate(id, {$pull: { comments: commentId }}, {runValidators: true, new: true});
    } catch (err){
        throw boom.internal('no pudimos desvincular el comentario del post al eliminarlo');
    }
}

module.exports = {
    add: addPost,
    get: getPosts,
    getOne: getOnePost,
    update: updatePost,
    delete: deletePost,
    addComment: addCommentToPost,
    deleteComment: deleteCommentFromPost,
}