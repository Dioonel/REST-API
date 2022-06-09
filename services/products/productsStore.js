const Model = require('./productModel');
const boom = require('@hapi/boom');

const MAX_INT = 2147483647;

async function addItem(item){
    try{
        const myItem = new Model(item);
        return await myItem.save();
    } catch (err) {
        throw boom.internal('Internal error, please try again later');
    }
}

async function getItems(filter){
    try{
        if(filter){
            return await Model.find({$and: [
                {name: {$regex: filter.name || '', $exists: true, $options: 'i'}},
                {price: {$gt: filter.min_price || 0, $lt: filter.max_price || MAX_INT}}]})
                .limit(filter.limit || null)
                .skip((filter.limit || 1) * filter.skip || 0)
                .collation({locale: 'en'})                                                         // This line allows case insensitive sorting
                .sort({[filter.sortBy || '_id']: filter.sortWay || 1});
        } else {
            return await Model.find(null);
        }
        
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
        return await Model.findByIdAndUpdate(id, patch, { runValidators: true, new: true });
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