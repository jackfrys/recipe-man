var app = require("../../express");
var mongoose = require("mongoose");
var pantryModel = require("../database/model/pantry.model");

app.get("/api/:uid/pantry", function (req, res) {
    pantryModel.pantryForUser(req.params.uid).then(function (data) {
        res.json(data);
    }).catch(function () {
        res.sendStatus(400);
    });
});

app.post("/api/:uid/pantry/add", function (req, res) {
    pantryModel.addPantryForUser(req.params.uid, req.body).then(function (data) {
        res.json(data);
    }).catch(function () {
        res.sendStatus(400);
    });
});

app.put("/api/pantry/:pid", function (req, res) {
    pantryModel.updatePantry(req.params.pid, req.body).then(function () {
        res.send(200);
    }).catch(function () {
        res.sendStatus(400);
    });
});

app.get("/api/pantry/:pid", function (req, res) {
    pantryModel.findById(req.params.pid).then(function (data) {
        res.json(data);
    }).catch(function () {
        res.sendStatus(400);
    });
});

app.get("/api/pantries", function (req, res) {
    pantryModel.allPantries().then(function (data) {
        res.json(data);
    }).catch(function () {
        res.sendStatus(400);
    });
});

app.delete("/api/pantry/:pid", function (req, res) {
    pantryModel.findByIdAndRemove(req.params.pid).then(function () {
        res.sendStatus(200);
    }).catch(function () {
        res.sendStatus(400);
    });
});

module.exports = app;