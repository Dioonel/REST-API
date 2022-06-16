const mongoose = require('mongoose');
//const productStore = require('./../products/productsStore');

const Schema = mongoose.Schema;

//const options = { toObject: { virtuals: true }, toJSON: { virtuals: true }};

const itemSchema = new Schema({
    product: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'products',
    },
    amount: {
        type: Number,
        required: true,
        min: 1,
    },
});


// itemSchema.virtual('total').get(async function (){
//     let product = await productStore.getOne(this.product);
//     if(product?.price){
//         return product.price * this.amount;
//     }
//     return undefined;
// });
    

const model = mongoose.model('items', itemSchema);

module.exports = model;