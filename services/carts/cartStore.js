const Model = require('./cartModel');
const boom = require('@hapi/boom');
//const productStore = require('./../products/productsStore');

async function addCart(userId){
    try{
        const myCart = new Model({user: userId});
        const newCart = await myCart.save();
        return newCart._id;
    } catch (err) {
        throw boom.internal('Internal error, please try again later');
    }
}

async function getCart(userId){
    try{
        return await Model.findOne({user: userId})
        //.populate({path: 'users', select: 'username first_name last_name image contact'})
        .populate({path: 'items', select: 'product amount', populate: {path: 'product', model: 'products', select: 'name price image', populate: {path: 'seller', model:'users', select: 'username'}}});
    } catch (err) {
        throw boom.internal('Internal error, please try again later');
    }
}

async function pushItem(cartId, item){
    try{
        return await Model.findByIdAndUpdate(cartId, {$push: {items: item}}, { runValidators: true, new: true });
    } catch (err) {
        throw boom.internal('Internal error, please try again later');
    }
}

async function popItem(cartId, itemId){
    try{
        return await Model.findByIdAndUpdate(cartId, {$pull: { items: itemId }}, {runValidators: true, new: true});
    } catch (err) {
        throw boom.internal('Internal error, please try again later');
    }
}

async function emptyCart(cartId){
    try{
        return await Model.findByIdAndUpdate(cartId, { $set: { items: [] } });
    } catch (err) {
        throw boom.internal('Internal error, please try again later');
    }
}


module.exports = {
    cartInit: addCart,
    getCart,
    pushItem,
    popItem,
    emptyCart,
}