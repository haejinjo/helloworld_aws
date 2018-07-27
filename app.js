const express = require('express');
const app = express();
let path = require('path');
let bodyparser = require('body-parser');
let BlogPost = require('./models/blogPosts');
// let mysql = require('mysql');
let env = process.env.NODE_ENV || 'dev';
let config = require('./config')[env];
let secret = config.database;
let secretServer = config.server;


/*
TODO: BEST PRACTICES FOR EXPRESS APP ROUTING 

Usually you will have at least one file for each logical part of your application. 
For example, one file to handle comments action, another file to handle requests about users and so on. 
It’s a good practice that all routes from the same controller begin with the same prefix. For example /comments/all and /comments/new.

It’s sometimes hard to decide what should go into a controller and what should go into the model. 
A best practice is that a controller should never directly access the database. 
It should never call methods like “write”, “update”, “fetch” which most database drivers provide. 
Instead it should rely on model methods. For example if you have a car model, and you want to mount 4 wheels to the car, 
the controller will not call db.update(id, {wheels: 4}) but instead it will call something like car.mountWheels(id, 4).
*/

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.json({ limit: '50mb' }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.route('/submit')
    .get(function routeSubmitGet(req, res) {
        res.sendFile(__dirname + '/views/blog-submit.html');
    })
    .post(function routeSubmitPost(req, res) {
        BlogPost.create(req);
        res.json(req.body);
    });


app.get('/blogPostData', function getOldPostContent(req, res) {
    BlogPost.getAll(function (err, results) {
        if (err) next(err);
        else res.send(results);
    });
});

// app.route('/blog')
//     .get(function routeBlog)
// app.route('/blog')
//     .get(function routeBlogGet(req, res) {
//         res.send('got blog');
//     })
//     .post(function routeBlogPost(req, res) {
//         res.send('posted from blog');
//     })

app.listen(secretServer.port, () => console.log("Listening on port", secretServer.port));
