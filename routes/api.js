let express = require('express');
let router = express.Router();
let BlogPost = require('../models/blogPosts');

router.get('/:post_id', function (req, res, next) {
    BlogPost.get(req.params.post_id, function (err, data) {
        if (err) next(err);
        else {
            console.log("Got the data from mysql: ", data[0]);
            res.send(data[0]);
        }
    });
});

module.exports = router;