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
        return await Model.find().populate('seller').populate('product').exec();
    } catch (err) {
        throw boom.internal('error al obtener posts');
    }
}

module.exports = {
    add: addPost,
    get: getPosts,
}