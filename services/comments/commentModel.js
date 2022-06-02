const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    post: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'postings'
    },
    body: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true,
    }
});

const model = mongoose.model('comments', commentSchema);
module.exports = model;