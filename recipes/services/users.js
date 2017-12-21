var app = require("../../express");
var mongoose = require("mongoose");
var userModel = require("../model/user.model");
var pantryModel = require("../model/pantry.model");

app.get("/api/user/:uid", function (req, res) {
    userModel.getUser(req.params.uid).then(function (data) {
        res.json(data);
    }).catch(function () {
        res.sendStatus(400);
    });
});

app.post("/api/user/", function (req, res) {
    var user = req.body;
    userModel.findByCredentials(user.username, user.password).then(function (data) {
        if (data.length === 0) {
            userModel.createUser(user).then(function (comp) {
                pantryModel.addPantryForUser(comp._id, {name: comp.username + "'s Pantry"}).then(function () {
                    res.json(comp);
                });
            });
        } else {
            res.sendStatus(400);
        }
    }).catch(function () {
        res.sendStatus(400);
    });
});

app.delete("/api/user/:uid", function (req, res) {
    userModel.deleteUser(req.params.uid).then(function () {
        res.sendStatus(200);
    }).catch(function () {
        res.sendStatus(400);
    });
});

app.put("/api/user/:uid", function (req, res) {
    userModel.updateUser(req.params.uid, req.body).then(function () {
        res.sendStatus(200);
    }).catch(function () {
        res.sendStatus(400);
    });
});

app.get("/api/user/:un/:pw", function (req, res) {
    userModel.findByCredentials(req.params.un, req.params.pw).then(function (data) {
        res.json(data);
    }).catch(function () {
        res.sendStatus(400);
    });
});

app.get("/api/users", function (req, res) {
    userModel.allUsers().then(function (data) {
        res.json(data);
    }).catch(function () {
        res.sendStatus(400);
    });
});

app.get("/api/admin/:un/:pw", function (req, res) {
    var user = {username: req.params.un, password: req.params.pw, admin: true};
    userModel.createUser(user).then(function () {
        res.sendStatus(200);
    }).catch(function () {
        res.sendStatus(400);
    });
});

app.get("/api/username/:un", function (req, res) {
    userModel.findOne({username: req.params.un}).then(function (user) {
        res.json(user);
    }).catch(function () {
        res.sendStatus(400);
    });
});

module.exports = userModel;