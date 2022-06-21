const mongoose = require('mongoose');
const itemModel = require('./itemModel');

const Schema = mongoose.Schema;

const options = { toObject: { virtuals: true }, toJSON: { virtuals: true }};

const cartSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users',
        immutable: true,
    },
    items: [{
        type: mongoose.Types.ObjectId,
        required: false,
        ref: 'items',
    }],
    created_at: {
        type: Date,
        default: Date.now,
        required: true,
        immutable: true,
    }
}, options);

cartSchema.virtual('subtotal').get(async function () {
    let subtotal = 0;
    for(let itemId of this.items){
        let myItem = await itemModel.findById(itemId).populate('product');
        subtotal += ((myItem?.product?.price) || 0 )* ((myItem?.amount) || 0);
    }
    return parseInt(subtotal);
});

const model = mongoose.model('carts', cartSchema);
module.exports = model;