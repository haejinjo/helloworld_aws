const express = require('express');
const app = express();
let path = require('path');

app.listen(3000, () => console.log("Listening on 3000!"));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.get('/submit', function (req, res) {
    res.sendFile(__dirname + '/blog-submit.html');
});

app.use(express.static(path.join(__dirname, 'assets')));


