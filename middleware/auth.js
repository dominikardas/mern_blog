const config = require('config');
const jwt    = require('jsonwebtoken');

const { check, validationResult } = require('express-validator/check');
const { sanitizeBody }           = require('express-validator/filter');

const User = require('../models/User');

var authMiddleware = {

    // Check if a user is logged in
    isLoggedIn: function auth(req, res, next) {
    
        // console.log(req.cookies);

        const token = req.cookies.token;//req.header('x-auth-token');
    
        // Check for token 
        if (!token) return res.status(401).json( { msg: 'Unauthorized' } );
    
        try {        
            // Verify the token
            const decoded = jwt.verify(token, config.get('jwtSecret'));
            // Add user from payload
            req.user = decoded;
            next();
        }
        catch (error) {
            res.status(400).json( { msg: 'Invalid token' } ); 
        }
    },
    isAdmin: function isAdmin(req, res, next) {

        // Get the ID from the decoded JWT token
        const { id } = req.user;

        // Check if there is a user with such ID
        // If so, continue, otherwise throw 401
        User.findById(id)
            .then(user => {
                if (user && user.isAdmin) next();
                else res.status(401).json( { msg: 'Unauthorized' } );
            });
    }
};

module.exports = authMiddleware;