const express = require('express');
const app = express();
let mysql = require('mysql');
let path = require('path');
let bodyparser = require('body-parser');
let env = process.env.NODE_ENV || 'dev';
let config = require('./config')[env];
let secret = config.database;
let secretServer = config.server;

let con = mysql.createConnection({
    host: secret.host,
    user: secret.user,
    password: secret.password,
    database: secret.db,
});

con.connect(function (err) {
    if (err) throw err;
    console.log('Connected to mysql database');
})

app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyparser.json({ limit: '50mb' }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.route('/submit')
    .get(function routeSubmitGet(req, res) {
        res.sendFile(__dirname + '/blog-submit.html');
    })
    .post(function routeSubmitPost(req, res) {
        let sqlCommand = "INSERT INTO posts (content) VALUES (\'" + req.body.content + "\');";

        con.query(sqlCommand, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    })

// app.route('/blog')
//     .get(function routeBlogGet(req, res) {
//         res.send('got blog');
//     })
//     .post(function routeBlogPost(req, res) {
//         res.send('posted from blog');
//     })

app.listen(secretServer.port, () => console.log("Listening on port", secretServer.port));
