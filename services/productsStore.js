const Model = require('./productModel');
const boom = require('@hapi/boom');

async function addItem(item){
    try{
        const myItem = new Model(item);
        return await myItem.save();
    } catch (err) {
        throw boom.internal('Internal error, please try again later');
    }
}

async function getItems(){
    try{
        const items = await Model.find();
        return items;
    } catch (err) {
        throw boom.internal('Internal error, please try again later');
    }
}

async function getOneItem(id){
    try{
        return await Model.findById(id);
    } catch (err) {
        throw boom.internal('Internal error, please try again later');
    }
}

async function updateItem(id, patch){
    try{
        return await Model.findByIdAndUpdate(id, patch, { runValidators: true });
    } catch (err){
        throw boom.internal('Internal error, please try again later');
    }
}

async function deleteItem(id){
    try{
        return await Model.findByIdAndDelete(id)
    } catch (err){
        throw boom.internal('Internal error, please try again later');
    }
}


module.exports = {
    add: addItem,
    get: getItems,
    getOne: getOneItem,
    update: updateItem,
    delete: deleteItem,
}