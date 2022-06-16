const Model = require('./itemModel');
const boom = require('@hapi/boom');

async function addItem(item){
    try{
        const myItem = new Model(item);
        return await myItem.save();
    } catch (err) {
        throw boom.internal('Internal error, please try again later');
    }
}

async function deleteItem(itemId){
    try{
        return await Model.findByIdAndDelete(itemId);                                        // Delete an item by id
    } catch (err) {
        throw boom.internal('Internal error, please try again later');
    }
}

async function deleteManyItems(itemIds){
    try{                                                                                    // Delete many items by id
        return await Model.deleteMany({ _id: { $in: itemIds }});
    } catch (err) {
        throw boom.internal('Internal error, please try again later');
    }
}

module.exports = {
    addItem,
    deleteItem,
    deleteManyItems,
}