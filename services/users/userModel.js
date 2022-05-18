const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: false,
        default: '',
    },
    last_name: {
        type: String,
        required: false,
        default: '',
    },
    gender: {
        type: String,
        required: false,
        default: '',
    },
    job_area: {
        type: String,
        required: false,
        default: '',
    },
    contact: {
        type: String,
        required: false,
        default: '',
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true,
    }
});

const model = mongoose.model('users', userSchema);

module.exports = model;