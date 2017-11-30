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

app.get("/api/recipe/:rid", function (req, res) {
    recipeModel.findById(req.params.rid).then(function (data) {
        res.json(data);
    });
});

app.post("/api/:uid/recipe/create", function (req, res) {
    recipeModel.createRecipe(req.params.uid, req.body).then(function () {
        res.send(200);
    }).catch(function (err) {
        res.send(400);
    });
});

app.delete("/api/:rid", function (req, res) {
    recipeModel.deleteRecipe(req.params.rid).then(function () {
        res.send(200);
    });
});

app.put("/api/recipe/:rid/update", function (req, res) {
    recipeModel.updateRecipe(req.params.rid, req.body).then(function () {
        res.send(200);
    });
});

app.post("/api/:rid/share/:uid", function (req, res) {
    recipeModel.findById(req.params.rid).then(function (data) {
        data.shared.push(req.params.uid);
        recipeModel.findByIdAndUpdate(req.params.rid, {$set:data}).then(function () {
            res.send(200);
        });
    });
});

app.put("/api/:rid/category/:cid", function (req, res) {
    recipeModel.addCategory(req.params.rid, req.params.cid).then(function () {
        res.send(200);
    }).catch(function () {
        res.send(400);
    });
});

app.delete("/api/:rid/category/:cid", function (req, res) {
    recipeModel.removeCategory(req.params.rid, req.params.cid).then(function () {
        res.send(200);
    });
});

app.get("/api/recipes", function (req, res) {
    recipeModel.allRecipes().then(function (data) {
        res.json(data);
    });
});

module.exports = recipeModel;