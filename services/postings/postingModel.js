const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postingSchema = new Schema({
    seller: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users',
        immutable: true,
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
        immutable: true
    },
    comments: [{
        type: mongoose.Types.ObjectId,
        required: false,
        ref: 'comments',
    }],
    created_at: {
        type: Date,
        default: Date.now,
        required: true,
        immutable: true,
    }
});

const model = mongoose.model('postings', postingSchema);
module.exports = model;