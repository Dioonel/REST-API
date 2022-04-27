const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
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
});

const model = mongoose.model('products', itemSchema);
module.exports = model;