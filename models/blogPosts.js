let express = require('express');
let mysql = require('mysql');
let env = process.env.NODE_ENV || 'dev';
let config = require('../config')[env];
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

exports.create = function (req, callback) {
    let insertContent = req.body.content ? String(req.body.content).replace(/'/g, "\\'") : '';

    let sqlCommand = "INSERT INTO posts VALUES(null, \'" + String(req.body.title).replace(/'/g, "\\'") + "\', \'" + insertContent + "\', NOW())";

    console.log("attempt to log ", sqlCommand);
    con.query(sqlCommand, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
}

exports.get = function (id, callback) {
    let sqlCommand = "SELECT * FROM posts";
    if (id) {
        sqlCommand += " WHERE id=" + id;
    }
    con.query(sqlCommand, function (err, rows) {
        if (err) {
            console.log("ERROR RETRIEVING POSTS FROM MYSQL: ", err);
            return callback(err, null);
        }
        else {
            return callback(null, rows)
        }
        console.log("Got 'em!")
        return rows;
    });

}

