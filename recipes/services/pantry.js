var app = require("../../express");
var mongoose = require("mongoose");
var pantryModel = require("../model/pantry.model");

app.get("/api/:uid/pantry", function (req, res) {
    pantryModel.pantryForUser(req.params.uid).then(function (data) {
        res.json(data);
    });
});

app.post("/api/:uid/pantry/add", function (req, res) {
    pantryModel.addPantryForUser(req.params.uid, req.body).then(function (data) {
        res.json(data);
    });
});

app.put("/api/:pid/update", function (req, res) {
    pantryModel.updatePantry(req.params.pid, req.body).then(function () {
        res.send(200);
    });
});

app.get("/api/pantry/:pid", function (req, res) {
    pantryModel.findById(req.params.pid).then(function (data) {
        res.json(data);
    });
});

app.get("/api/pantries", function (req, res) {
    pantryModel.allPantries().then(function (data) {
        res.json(data);
    });
});

module.exports = app;