var app = require('./express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var q = require('q');

var connectionString = 'mongodb://127.0.0.1:27017/recipe-man'; // for local
if (process.env.MONGODB_URI) { // check if running remotely
    var connectionString = process.env.MONGODB_URI;
}

var mongoose = require("mongoose");
mongoose.connect(connectionString);
mongoose.Promise = q.Promise;

var TestSchema = mongoose.Schema({
    message: String
});

var TestModel = mongoose.model("TestModel", TestSchema);

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
