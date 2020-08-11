/**
 * API entry point for 'Posts'
 * /api/posts
 */

const express       = require('express');
const sanitizeHtml = require('sanitize-html');

const auth = require('../../middleware/auth');

const router = express.Router();

const postsPerPage = 6;

// Post Model
const Post = require('../../models/Post');
const Category = require('../../models/Category');

// @route  GET api/posts
// @desc   Get all posts
// @auth   Private - admin
router.get('/', [auth.isLoggedIn, auth.isAdmin], (req, res) => {

    const page = req.query.page ? req.query.page - 1 : 0;

    Post.count()
        .then(postsCount => {        

            // Fetch all posts from DB
            Post.find()
                .sort( { publishedAt: -1 } )        // Sort by published date
                .skip(page * postsPerPage)
                .limit(postsPerPage)
                .then(posts => res.json(
                    { 
                        posts,
                        postsCount,
                        postsPerPage
                        
                    }
                ))
                .catch(err => res.status(400).json( { success: false } ));        
        })
});

// @route  GET api/posts/published
// @desc   Get all published posts
router.get('/published', (req, res) => {

    const page = req.query.page ? req.query.page - 1 : 0;

    const query = {
        published: true
    }

    Post.count(query)
        .then(postsCount => {      

            // Fetch all posts from DB
            Post.find(query)
                .sort( { publishedAt: -1 } )        // Sort by published date
                .skip(page * postsPerPage)
                .limit(postsPerPage)
                .then(posts => res.json(
                    { 
                        posts,
                        postsCount,
                        postsPerPage                        
                    }
                ))
                .catch(err => res.status(400).json( { success: false } ));        
        })
});

// @route  GET api/posts/findByCategory/:categoryName
// @desc   Get all posts from given category
router.get('/findByCategory/:categoryName', (req, res) => {

    const page = req.query.page ? req.query.page - 1 : 0;

    const query = {
        categoryName: req.params.categoryName
    };

    // Find all posts from given category
    // Post.find(query)
    //     .sort( { publishedAt: -1 } )
    //     .then (posts => res.json(posts))
    //     .catch(err => res.status(400).json( { success: false } ));

    Post.count(query)
        .then(postsCount => {      

            // Fetch all posts from DB
            Post.find(query)
                .sort( { publishedAt: -1 } )        // Sort by published date
                .skip(page * postsPerPage)
                .limit(postsPerPage)
                .then(posts => res.json(
                    { 
                        posts,
                        postsCount,
                        postsPerPage                        
                    }
                ))
                .catch(err => res.status(400).json( { success: false } ));      
        })
});

// @route  GET api/posts/findBySlug/:slug
// @desc   Find a post by id
// @desc   Private - admin
router.get('/findById/:id', [auth.isLoggedIn, auth.isAdmin],  (req, res) => {

    const query = {
        _id: req.params.id
    };

    // Find all posts from given category
    Post.find(query)
        .then (posts => res.json(posts))
        .catch(err => res.status(400).json( { success: false } ));
});

// @route  GET api/posts/findBySlug/:slug
// @desc   Find a post by slug
router.get('/findBySlug/:slug', (req, res) => {

    const query = {
        slug: req.params.slug,
        published: true
    };

    // Find all posts from given category
    Post.find(query)
        .then (posts => res.json(posts))
        .catch(err => res.status(400).json( { success: false } ));
});

// @route  POST api/posts
// @desc   Create a new post
// @auth   Private
router.post('/', [auth.isLoggedIn], (req, res) => {

    const data = req.body;

    if (!data.title     || !data.content || 
        !data.postImage || !data.authorName || !data.categoryName) {
        return res.status(400).json( { msg: 'Please, include all parameters' });
    }

    // <h1> <h2> <h3> <b> <i> <u> <a> <br> <p> <img> <div> <ul> <ol> <li>
    // Sanitize the input
    const content = sanitizeHtml(data.content, {
        allowedTags: ['h1', 'h2', 'h3', 'b', 'i', 'u', 'a', 'br', 'p', 'div', 'ul', 'ol', 'li']
    });

    // Generate a slug
    var slug = data.title.toLowerCase()
    slug = slug.split(' ').join('-');
    slug = slug.replace(/[^A-Za-z0-9\-]/g,"");
    slug += '-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Check if the category is valid
    Category.findOne( { categoryName: data.categoryName } )
        .then(item => {
            if (!item) {
                return res.status(400).json( { msg: 'Invalid category' } );
            }
        })
        .catch(err => {
            return res.status(400).json( { msg: 'Invalid category' } );
        });

    // Create a new Post object
    const newPost = new Post({
        title: data.title,                                                      //'Test Title',
        slug,                                                                   //'test-slug-vp94mgmnavxpgid6o6vho',
        content,                                                                //'<h1>Hello World!</h1>',
        postImage: data.postImage,                                              //'NULL',
        authorName: data.authorName,                                            //'Dominik',
        categoryName: data.categoryName,                                        //'News',
        tags: data.tags
    });

    // Save to DB
    newPost.save()
        .then(item =>             
            res.json( { msg: 'Post submitted for revieew' } )
        );
});

// @route  POST api/posts/publish/:id
// @desc   Publish a post
// @auth   Private - admin
router.post('/publish/:id', [auth.isLoggedIn, auth.isAdmin], (req, res) => {

    const { id } = req.params;

    // console.log(id);
    
    Post.update( { _id: id }, { published: true }, { upsert: true })
        .then(res.json( { msg: 'Post published' } ))
        .catch(err => res.status(400).json( { msg: 'Invalid post id' } ));

});

// @route  POST api/posts/unpublish/:id
// @desc   Unpublish a post
// @auth   Private - admin
router.post('/unpublish/:id', [auth.isLoggedIn, auth.isAdmin], (req, res) => {

    const { id } = req.params;

    // console.log(id);
    
    Post.update( { _id: id }, { published: false }, { upsert: true })
        .then(res.json( { msg: 'Post unpublished' } ))
        .catch(err => res.status(400).json( { msg: 'Invalid post id' } ));

});
// @route  DELETE api/posts/:id
// @desc   Delete a post
// @auth   Private - admin
router.delete('/:id', [auth.isLoggedIn, auth.isAdmin], (req, res) => {

    // Find a post by posted id
    // If a post with given id is found, delete it from the database
    Post.findById(req.params.id)
        .then (post => post.remove()
                           .then(res.json( { msg: 'Post deleted' } ))
              )
        .catch(err => res.status(400).json( { msg: 'There was an error' + err } ));
});

module.exports = router;