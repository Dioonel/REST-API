const Model = require('./userModel');
const boom = require('@hapi/boom');

async function addUser(user){
    try{
        const myUser = new Model(user);
        return await myUser.save();
    } catch (err) {
        throw boom.internal('Internal error, please try again later');
    }
}

async function getUsers(filter){
    try{
        return await Model.find().select(['-password']);
    } catch (err){
        throw boom.internal('Internal error, please try again later');
    }
}

async function getOneUser(id){
    try{
        return await Model.findById(id).select(['-password']);
    } catch (err) {
        throw boom.internal('Internal error, please try again later');
    }
}

async function getOneUserByUsername(username){
    try {
        return await Model.findOne().where({username: username});
    } catch (err) {
        throw boom.internal('Internal error, please try again later');
    }
}

async function updateUser(id, patch){
    try{
        return await Model.findByIdAndUpdate(id, patch, { runValidators: true });
    } catch (err){
        throw boom.internal('Internal error, please try again later');
    }
}

async function deleteUser(id){
    try{
        return await Model.findByIdAndDelete(id)
    } catch (err){
        throw boom.internal('Internal error, please try again later');
    }
}

module.exports = {
    add: addUser,
    get: getUsers,
    getOne: getOneUser,
    getByUsername: getOneUserByUsername,
    update: updateUser,
    delete: deleteUser,
}