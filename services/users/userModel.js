const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    job_area: {
        type: String,
        required: false,
    },
    contact: {
        type: String,
        required: false,
    },
});

const model = mongoose.model('users', userSchema);

module.exports = model;