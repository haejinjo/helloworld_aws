let express = require('express');
let router = express.Router();
let path = require('path');
let BlogPost = require('../models/blogPosts.js');
let fs = require('fs');
let favicon = require('serve-favicon');
let bodyparser = require('body-parser');
// router.use(favicon(path.join(__dirname, 'public', 'images', 'favImages', 'favicon.ico')));
// router.use(express.static(path.join(__dirname, '/../public'))); // gets Express to serve all the static files in the /public directory in project's root
router.use(bodyparser.json({ limit: '50mb' }));

// router.use(express.static(path.join(__dirname, '/../public'))); // gets Express to serve all the static files in the /public directory in project's root

// Specify a route on the express.Router object
// This route defines a callback that is invoked when an HTTP GET request with the correct pattern is detecte (i.e.  when a URL of "/users/" is received by the server) 
router.get('/', function (req, res, next) {

    //if we're getting a request for a specific blog post....
    if (req.query.id) {
        BlogPost.get(req.query.id, function (err, data) {
            if (err) next(err);
            else {
                res.redirect('/blog/' + req.query.id);
            }
        });
    }

    else {
        res.sendFile('/views/blog-archive.html', { root: '.' });
    }
});

// This where you go if you request a specific blog post
router.get('/:id', function (req, res, next) {
    res.sendFile('views/blog.html', { root: '.' });
});

router.get('/:id/deets', function (req, res, next) {

    function getHTML(callback) {
        fs.readFile('/views/blog.html', function (err, data) {
            if (err) callback(err, null);
            else {
                callback(null, data);
            }
        });
    }

    getHTML(function (e, data) {
        if (e) throw e;
        else {
            let dataObj = {};
            dataObj[title] = res[0].title;
            dataObj[content] = res[0].content;
            dataObj[creationDate] = res[0].entry_time;
            res.json(JSON.stringify(dataObj));
        }
    });
});

router.route('/submit')
    .get(function routeSubmitGet(req, res) {
        res.sendFile(__dirname + '/views/blog-submit.html');
    })
    .post(function routeSubmitPost(req, res) {
        BlogPost.create(req);
        res.json(req.body);
    });

router.get('/postData', function getOldPostContent(req, res) {
    BlogPost.get(function (err, results) {
        if (err) next(err);
        else res.send(results);
    });
});

// Exports the router from the module (what allows the file to be imported into app.js)
module.exports = router;