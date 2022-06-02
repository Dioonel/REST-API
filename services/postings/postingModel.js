const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postingSchema = new Schema({
    seller: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: false,
    },
    product: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'products',
    } 
});

const model = mongoose.model('postings', postingSchema);
module.exports = model;