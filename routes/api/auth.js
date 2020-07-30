/**
 * API entry point for Authentication
 * /api/auth
 */

const express = require('express');
const bcrypt  = require('bcryptjs');
const config  = require('config');
const jwt     = require('jsonwebtoken');
const auth    = require('../../middleware/auth');

const { check, validationResult } = require('express-validator/check');
const { sanitizeBody }            = require('express-validator/filter');

const router = express.Router();

// User Model
const User = require('../../models/User');

// @route  POST api/auth
// @desc   Authenticate user
// @access Public
router.post('/', 
    [
        // Form validation
        check('username').not().isEmpty().withMessage('Please, fill in the username'),
        check('password').not().isEmpty().withMessage('Please, fill in the password')
    ],
    
    (req, res) => {

    const data = req.body;

    // Form check
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array()} );
    }

    // if (!data.username || !data.password) {
    //     return res.status(400).json({ 
    //         errors: [
    //             { msg: 'Please, fi enter all fields' }
    //         ]
    //     });
    // }

    // Check for existing user
    User.findOne( { username: data.username } )
        .then( user => {

            if (!user) {
                return res.status(400).json({ 
                    errors: [
                        { msg: 'User does not exist' }
                    ]
                });
            }
            
            // Validate the password
            bcrypt.compare(data.password, user.password)
                .then(isMatch => {
                    
                    if (!isMatch) {                        
                        return res.status(400).json({ 
                            errors: [
                                { msg: 'Invalid credentials' }
                            ]
                        });
                    }
                    // if (!isMatch) return res.status(400).json( { msg: 'Invalid credentials' } );

                    jwt.sign(
                        { id: user._id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 * 24 },
                        (err, token) => {
                            if (err) throw err;

                            res.cookie('token', token, { httpOnly: true });

                            res.json({
                                // token,
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    username: user.username,
                                    isAdmin: user.isAdmin
                                }
                            });
                        }
                    )
                });
        });
});

// @route  POST api/auth/logout
// @desc   Logout user
router.post('/logout', (req, res) => {
    res.cookie('token', '', { httpOnly:true, expires:Date.now(), maxAge: 0 });
    res.json( { success: true } );
});

// CSRF
router.get('/csrf', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

// @route  GET api/auth/user
// @desc   Get user data
// @access Private
router.get('/user', [auth.isLoggedIn], (req, res) => {

    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

module.exports = router;