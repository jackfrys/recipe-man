var app = require('./express');

var bodyParser = require('body-parser');

var express = app.express;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/client/build'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require("./recipe-man/app")(app);

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/client/build/index.html');
});

port = process.env.PORT || 5000;
app.listen(port);