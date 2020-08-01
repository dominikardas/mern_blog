const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        default: false,
    },
    publishedAt: {
        type: Date,
        default: Date.now()
    },
    content: {
        type: String,
        required: true
    },
    postImage: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    categoryName: {
        type: String,
        required: true
    },
    tags: {
        type: Array
    }
});

module.exports = Post = mongoose.model('post', PostSchema);