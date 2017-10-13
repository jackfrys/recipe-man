var app = require('./express');

var bodyParser    = require('body-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');

var express = app.express;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./app");

port = process.env.PORT || 5000;
app.listen(port);