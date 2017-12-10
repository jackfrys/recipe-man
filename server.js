var app = require('./express');

var bodyParser = require('body-parser');
const path = require('path');

var express = app.express;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require("./recipes/app")(app);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

port = process.env.PORT || 5000;
app.listen(port);