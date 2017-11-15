var app = require("../../express");
var mongoose = require("mongoose");
var userModel = require("../model/route/route.model.server");

app.get("/user/:uid", function (req, res) {
    userModel.getUser(req.params.uid).then(function (data) {
        res.json(data);
    });
});

app.post("/user/create", function (req, res) {
    userModel.createUser(req.data).then(function () {
        res.send(200);
    });
});

app.delete("/user/:uid", function (req, res) {
    userModel.deleteUser(req.params.uid).then(function () {
        res.send(200);
    });
});

app.post("/user/:uid:/update", function (req, res) {
    userModel.updateUser(req.params.uid, req.data).then(function () {
        res.send(200);
    })
});

app.get("/user/:un/:pw", function (req, res) {
    userModel.findByCredentials(req.params.un, req.params.pw).then(function (data) {
        res.json(data);
    });
});