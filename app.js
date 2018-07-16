const express = require('express');
const app = express();

app.listen(3000, () => console.log("Listening on 3000!"));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.get('/styles', function (req, res) {
    res.sendFile(__dirname + '/main.css');
});

app.use(express.static(__dirname, '/images'));