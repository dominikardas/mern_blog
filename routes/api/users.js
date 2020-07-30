/**
 * API entry point for 'Users'
 * /api/users
 */

const express = require('express');
const bcrypt  = require('bcryptjs');
const config  = require('config');
const jwt     = require('jsonwebtoken');
const auth    = require('../../middleware/auth');

const { check, validationResult } = require('express-validator/check');
const { sanitizeBody }           = require('express-validator/filter');

const router = express.Router();

// User Model
const User = require('../../models/User');

// @route  GET api/users
// @desc   Get all users
// @access Private - admin
router.get('/', [auth.isLoggedIn, auth.isAdmin], (req, res) => {

    // Fetch all users from DB
    User.find()
        .select('-password')
        .then(items => res.json(items));
});

// @route  GET api/users/findById/:id
// @desc   Find a user by id
router.get('/findById/:id', (req, res) => {

    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(404).json( { msg: `No user with id ${req.params.id}` } ));
});

// @route  GET api/users/findByUsername/:username
// @desc   Find a user by a username
router.get('/findByUsername/:username', (req, res) => {

    const query = {
        username: req.params.username
    };

    User.find(query)
        .then(user => res.json(user))
        .catch(err => res.status(404).json( { msg: `No user with username ${req.params.username}` } ));
});

// @route  POST api/users
// @desc   Register a new user
router.post('/register', 
    [
        // Form validation
        check('name').not().isEmpty().trim().escape().withMessage('Name must be set'),
        check('username').isLength({min: 4}).trim().escape().withMessage('Username must have more than 4 characters'),
        check('password').isLength({min: 6}).trim().escape().withMessage('Password must have more than 6 characters'),
        check('password_r')
            .custom((value, { req }) => value === req.body.password)
            .trim().escape().withMessage('Passwords must match')
            
    ],
    (req, res) => {

    const data = req.body;

    // Form check
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array()} );
    }

    // Check for existing user
    User.findOne( { username: data.username } )
        .then( user => {

            if (user) { 
                return res.status(400).json({
                    errors: [
                        { msg: 'User already exists' }
                    ]
                });
            }
            
            // Create a new Post object
            const newUser = new User({
                name: data.name,
                username: data.username,
                password: data.password
            });

            // Create salt & hash 
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then( user => {

                            jwt.sign(
                                { id: user._id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;

                                    res.cookie('token', token, { httpOnly: true });
                                    
                                    res.json({
                                        user: {
                                            id: user._id,
                                            name: user.name,
                                            username: user.username,
                                            isAdmin: user.isAdmin
                                        }
                                    });
                                }
                            );
                        });
                });
            });
        })
        .catch(err => res.status(400).json(err));
});

// @route  PUT api/users/:id
// @desc   Update user data
// @access Private
router.put('/:id', [auth.isLoggedIn], (req, res) => {
    
    const data = req.body;

    // Check if the user with the ID exists
    User.update( { _id: req.params.id }, data, { upsert: true })
        .then(res.json( { msg: 'User updated' } ))
        .catch(err => res.status(400).json( { msg: `No user with id ${req.params.id}` } ));

});

// @route  DELETE api/users/:id
// @desc   Delete a user
// @access Private - admin
router.delete('/:id', [auth.isLoggedIn, auth.isAdmin], (req, res) => {

    const query = {
        _id: req.params.id
    }

    // Find a user by posted id
    // If a user with given id is found, delete it from the database
    User.remove(query)
        .then (user => res.json( { success: true } ))
        .catch(err => res.status(400).json( { success: false } ));
});

module.exports = router;