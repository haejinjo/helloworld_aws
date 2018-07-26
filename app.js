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
    multipleStatements: true,
});

function handleDisconnect() {
    con.connect(function (err) {
        if (err) {
            console.log("Error connecting to db: ", err);
            setTimeout(handleDisconnect, 2000);
        }
        else {
            console.log('Connected to mysql database');
        }
    });

    con.on("error", function (err) {
        console.log("DB Error, ", err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            handleDisconnect();
        }
        else {
            throw err;
        }

    });
}

handleDisconnect();

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

        let insertContent = req.body.content ? String(req.body.content).replace(/'/g, "\\'") : '';

        let sqlCommand = "INSERT INTO posts VALUES(null, \'" + String(req.body.title).replace(/'/g, "\\'") + "\', \'" + insertContent + "\', NOW())";

        console.log("attempt to log ", sqlCommand);
        con.query(sqlCommand, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
        res.json(req.body);
    });


app.get('/blogPostData', function getOldPostContent(req, res) {
    let sqlCommand = "SELECT * FROM posts";

    con.query(sqlCommand, function (err, rows) {
        if (err) throw err;
        console.log("Got 'em!")
        res.send(rows);
    });
});

// app.route('/blog')
//     .get(function routeBlogGet(req, res) {
//         res.send('got blog');
//     })
//     .post(function routeBlogPost(req, res) {
//         res.send('posted from blog');
//     })

app.listen(secretServer.port, () => console.log("Listening on port", secretServer.port));
