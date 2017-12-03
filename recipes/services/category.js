var app = require("../../express");
var mongoose = require("mongoose");
var categoryModel = require("../model/category.model");

app.get("/api/categories", function (req, res) {
    categoryModel.allCategories().then(function (data) {
        res.json(data);
    });
});

app.get("/api/category/:cid", function (req, res) {
    categoryModel.categoryForId(req.params.cid).then(function (data) {
        res.json(data);
    });
});

app.put("/api/category/:cid/modify", function (req, res) {
    categoryModel.modifyCategory(req.params.cid, req.body).then(function () {
        res.send(200);
    });
});

app.delete("/api/category/:cid", function (req, res) {
    categoryModel.deleteCategory(req.params.cid).then(function () {
        res.send(200);
    });
});

app.post("/api/category/create", function (req, res) {
    categoryModel.createCategory(req.body).then(function (data) {
        res.json(data);
    });
});

module.exports = app;