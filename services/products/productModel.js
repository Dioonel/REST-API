const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },  
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

const model = mongoose.model('products', productSchema);
module.exports = model;