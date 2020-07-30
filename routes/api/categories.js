/**
 * API entry point for 'Categories'
 * /api/categories
 */

const express = require('express');
const auth    = require('../../middleware/auth');
const router = express.Router();

// Category Model
const Category = require('../../models/Category');

// @route   GET api/categories
// @desc    Get all categories
router.get('/', (req, res) => {

    // Fetch all items from DB
    Category.find()
            .then(items => res.json(items));
});

// @route   POST api/categories
// @desc    Create a new category
// @access  Private - admin
router.post('/', [auth.isLoggedIn, auth.isAdmin], (req, res) => {

    const data = req.body;

    if (!data.name) {
        res.status(400).json( { msg: 'Please, fill in the name' } );
        return;
    }

    const newCategory = new Category({
        categoryName: data.name,
        categoryURI: data.name.toLowerCase()
    });

    // Save to DB
    newCategory.save()
            .then(items => res.json(items));
});

// @route   DELETE api/categories/:id
// @desc    Delete a category
// @access  Private - admin
router.delete('/:id', [auth.isLoggedIn, auth.isAdmin], (req, res) => {

    const query = {
        _id: req.params.id
    };

    // Find a category by posted id
    // If a category with given id is found, delete it from the database
    Category.deleteOne(query)
            .then(res.json( { success: true } ))
            .catch(err => res.status(400).json( { success: false } ));
});

module.exports = router;