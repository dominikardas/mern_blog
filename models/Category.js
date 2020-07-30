const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CategorySchema = new Schema({

    categoryName : {
        type: String,
        required: true
    },
    categoryURI : {
        type: String,
        required: true
    },
});

module.exports = Category = mongoose.model('category', CategorySchema);