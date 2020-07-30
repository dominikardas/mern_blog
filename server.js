const express      = require('express');
const mongoose     = require('mongoose');
const config       = require('config');
const cookieParser = require('cookie-parser');
// const csrf         = require('csurf');
// const path  = require('path');

const app = express();

// Bodyparse Middleware
app.use(express.json());
// Cookie parser middleware
app.use(cookieParser());
// CSRF protection middleware
// app.use(csrf({ cookie: true }));

// Get database config
const db = config.get('mongoURI');

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true } )
    .then (()    => console.log('[SERVER_INFO] Connected to the database'))
    .catch((err) => console.log(`[SERVER_DB_ERR] There was an error connecting to the DB: ${err}`));

// Use routes
app.use('/api/posts',       require('./routes/api/posts'));
app.use('/api/users',       require('./routes/api/users'));
app.use('/api/auth',        require('./routes/api/auth'));
app.use('/api/categories',  require('./routes/api/categories'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`[SERVER] Listening on port ${port}`));
