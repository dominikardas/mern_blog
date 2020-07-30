const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({

    name : {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    isAdmin : {
        type: Boolean,
        default: false,
        required: false
    }
})

module.exports = User = mongoose.model('user', UserSchema);