let express = require('express');
let router = express.Router();
let BlogPost = require('../models/blogPosts');

router.get('/posts', function (req, res, next) {
    BlogPost.get("list", function (err, data) {
        if (err) next(err);
        else {
            console.log("Got the data from mysql: ", data);
            let dataRows = [];

            for (let i = 0; i < data.length; i++) {
                dataRows.push(data[i]);
            }

            res.send(dataRows);
        }
    })
});


router.get('/:post_id', function (req, res, next) {
    BlogPost.get(req.params.post_id, function (err, data) {
        if (err) next(err);
        else {
            res.send(data[0]);
        }
    });
});



module.exports = router;