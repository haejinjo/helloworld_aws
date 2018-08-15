let express = require('express');
let router = express.Router();
let path = require('path');
let BlogPost = require('../models/blogPosts.js');
let fs = require('fs');
let favicon = require('serve-favicon');
let bodyparser = require('body-parser');
router.use(favicon(path.join(__dirname, '../public', 'images', 'favImages', 'favicon.ico')));
router.use(express.static(path.join(__dirname, '../public'))); // gets Express to serve all the static files in the /public directory in project's root
router.use(bodyparser.json({ limit: '50mb' }));

// router.use(express.static(path.join(__dirname, '/../public'))); // gets Express to serve all the static files in the /public directory in project's root

// blog archives requested!
router.get('/', function (req, res, next) {
    res.sendFile('/views/blog-archive.html', { root: '.' });
});

router.route('/submit')
    .get(function routeSubmitGet(req, res) {
        res.sendFile(path.join(__dirname, '../views', 'blog-submit.html'));
    })
    .post(function routeSubmitPost(req, res) {
        BlogPost.create(req);
        res.json(req.body);
    });

// Specify a route on the express.Router object
// This route defines a callback that is invoked when an HTTP GET request with the correct pattern is detected (i.e.  when a URL of "/users/" is received by the server) 
router.get('/:post_id', function (req, res, next) {
    res.sendFile('views/blog.html', { root: '.' });
});



// Exports the router from the module (what allows the file to be imported into app.js)
module.exports = router;