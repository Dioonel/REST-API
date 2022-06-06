const Model = require('./postingModel');
const boom = require('@hapi/boom');

async function addPost(post){
    try{
        const myPost = new Model(post);                                                             // Create a new post
        return await myPost.save();
    } catch (err) {
        throw boom.internal('[Posting Store] - Internal error 1');
    }
}

async function getPosts(limit, skip){
    try{
        return await Model.find()                                                                   // Get all posts
        .select(['-__v'])
        .limit(limit)
        .skip((limit || 1) * skip)
        .populate({path: 'seller', select: 'username'})                                             // Populate user ref (seller)
        .populate({path: 'product', select: 'name price image'})                                    // Populate product ref
        .populate({path: 'comments', select: 'author text', populate: {path: 'author', model: 'users', select: 'username image'}})
        .exec();                                                                    // Populate comments, and populate user ref inside comments
    } catch (err) {
        throw boom.internal('[Posting Store] - Internal error 2');
    }
}

async function getOnePost(id){
    try{
        return await Model.findById(id)                                                             // Get a post by id
        .select(['-__v'])
        .populate({path: 'seller', select: 'username first_name last_name image contact'})          // Populate user ref (seller) (detailed)
        .populate({path: 'product', select: 'name price image'})
        .populate({path: 'comments', select: 'author text', populate: {path: 'author', model: 'users', select: 'username image'}})
        .exec();
    } catch(err) {
        throw boom.internal('[Posting Store] - Internal error 3');
    }
}

async function updatePost(id, patch){
    try{
        return await Model.findByIdAndUpdate(id, patch, { runValidators: true, new: true })             // Update a post
        .select(['-__v'])
        .populate({path: 'seller', select: 'username'})                                                 // Populate basic data
        .populate({path: 'product', select: 'name price image'})
        .populate({path: 'comments', select: 'author text'})
        .exec();
    } catch (err){
        throw boom.internal('[Posting Store] - Internal error 4');
    }
}

async function deletePost(id){
    try{
        return await Model.findByIdAndDelete(id)                                                        // Delete a post
    } catch (err){
        throw boom.internal('[Posting Store] - Internal error 5');
    }
}


async function addCommentToPost(id, comment){
    try{                                                                                                // Push a comment into a post
        return await Model.findByIdAndUpdate(id, {$push: { comments: comment }}, { runValidators: true, new: true });
    } catch (err) {
        throw boom.internal('[Posting Store] - Internal error 6');
    }
}

async function deleteCommentFromPost(id, commentId){
    try{                                                                                                // Pull a comment off a post
        return await Model.findByIdAndUpdate(id, {$pull: { comments: commentId }}, {runValidators: true, new: true});
    } catch (err){
        throw boom.internal('[Posting Store] - Internal error 7');
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