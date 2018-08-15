const express = require('express');
const app = express();
let path = require('path');
let bodyparser = require('body-parser');
let BlogPost = require('./models/blogPosts');
let env = process.env.NODE_ENV || 'production';
let config = require('./config')[env];
let secret = config.database;
let secretServer = config.server;
let favicon = require('serve-favicon');
let blogRouter = require('./routes/blog'); // require the module/file containing code for handling particular sets of related "routes" or URL paths
let apiRouter = require('./routes/api'); // this imported code will define particular (prefix) routes for different parts of the site 

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

// ADD MIDDLEWARE LIBRARIES TO THE REQUEST HANDLING CHAIN
app.use(favicon(path.join(__dirname, 'public', 'images', 'favImages', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public'))); // gets Express to serve all the static files in the /public directory in project's root
app.use(bodyparser.json({ limit: '50mb' }));

app.use('/blog', blogRouter);
app.use('/api', apiRouter);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html')
});


app.listen(secretServer.port, () => console.log("Listening on port", secretServer.port));
