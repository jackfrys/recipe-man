var app = require("../../express");
var mongoose = require("mongoose");
var userModel = require("../model/user.model");

app.get("/api/user/:uid", function (req, res) {
    userModel.getUser(req.params.uid).then(function (data) {
        res.json(data);
    });
});

app.post("/api/user/create", function (req, res) {
    userModel.createUser(req.body).then(function () {
        res.sendStatus(200);
    });
});

app.delete("/api/user/:uid", function (req, res) {
    userModel.deleteUser(req.params.uid).then(function () {
        res.sendStatus(200);
    });
});

app.put("/api/user/:uid/update", function (req, res) {
    userModel.updateUser(req.params.uid, req.data).then(function () {
        res.sendStatus(200);
    })
});

app.get("/api/user/:un/:pw", function (req, res) {
    userModel.findByCredentials(req.params.un, req.params.pw).then(function (data) {
        if (data.length == 0) {
            res.sendStatus(400);
        } else {
            res.json(data);
        }
    });
});

module.exports = userModel;