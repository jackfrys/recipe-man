var app = require('./express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var q = require('q');

var connectionString = 'mongodb://127.0.0.1:27017/recipe-man'; // for local
if (process.env.MONGODB_URI) { // check if running remotely
    var connectionString = process.env.MONGODB_URI;
}

app.use(bodyParser.json());

var mongoose = require("mongoose");
mongoose.connect(connectionString);
mongoose.Promise = q.Promise;

var TestSchema = mongoose.Schema({
    message: String
});

var TestModel = mongoose.model("TestModel", TestSchema);

require("./recipes/services/pantry");
require("./recipes/services/users");
require("./recipes/services/recipes");
require("./recipes/services/category");

app.get("/write/:str", function (req, res) {
    TestModel.create({message:req.params.str}).then(function () {
        res.send(200);
    })
});

app.get("/read", function (req, res) {
    TestModel.find({}).then(function (data) {
        res.json(data);
    })
});

module.exports = app;
