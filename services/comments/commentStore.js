const Model = require('./commentModel');
const boom = require('@hapi/boom');
const postingModel = require('../postings/postingStore');

async function addComment(comment){
    try{
        const myComment = new Model(comment);
        let newComment = await myComment.save();                                                        // Create a new comment

        return await postingModel.addComment(newComment.post, newComment);                              // Push the new comment into its post
    } catch (err) {
        throw boom.internal('[Comment Store] - Internal error 1');
    }
}

async function getOneComment(id){
    try{
        return await Model.findById(id);                                                                // Find one comment by id
    } catch (err){
        throw boom.internal('[Comment Store] - Internal error 2');
    }
}

async function updateComment(id, patch){
    try{
        let updatedComment = await Model.findByIdAndUpdate(id, patch, { runValidators: true, new: true });        // Update a comment
        return updatedComment;
    } catch (err){
        throw boom.internal('[Comment Store] - Internal error 3');
    }
}

async function deleteComment(id){
    try{
        let deletedComment = await Model.findByIdAndDelete(id);                                     // Delete a comment by id
        return await postingModel.deleteComment(deletedComment.post, id);                           // Delete comment reference from its post
            
    } catch (err){
        throw boom.internal('[Comment Store] - Internal error 4');
    }
}

module.exports = {
    add: addComment,
    getOne: getOneComment,
    update: updateComment,
    delete: deleteComment,
}