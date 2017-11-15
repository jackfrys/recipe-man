var app = require("../../express");
var mongoose = require("mongoose");
var recipeModel = require("../model/recipe.model");

app.get("/api/:uid/recipes", function (req, res) {
    recipeModel.recipesByUser(req.params.uid).then(function (data) {
        res.json(data);
    });
});

app.get("/api/:uid/shared", function (req, res) {
    recipeModel.sharedWithUser(req.params.uid).then(function (data) {
        res.json(data);
    });
});

app.post("/api/:uid/create", function (req, res) {
    recipeModel.createRecipe(req.params.uid, req.body).then(function () {
        res.send(200);
    });
});

app.delete("/api/:rid", function (req, res) {
    recipeModel.deleteRecipe(req.params.rid).then(function () {
        res.send(200);
    });
});

app.put("/api/:rid", function (req, res) {
    recipeModel.updateRecipe(req.params.rid, req.body).then(function () {
        res.send(200);
    });
});

module.exports = recipeModel;