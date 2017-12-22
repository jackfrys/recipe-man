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
    }).catch(function (err) {
        res.sendStatus(400);
    });
});

app.put("/api/category/:cid", function (req, res) {
    categoryModel.modifyCategory(req.params.cid, req.body).then(function () {
        res.sendStatus(200);
    });
});

app.delete("/api/category/:cid", function (req, res) {
    categoryModel.deleteCategory(req.params.cid).then(function () {
        res.sendStatus(200);
    });
});

app.post("/api/category", function (req, res) {
    categoryModel.createCategory(req.body).then(function (data) {
        res.json(data);
    });
});

app.get("/api/categoryname/:name", function (req, res) {
    categoryModel.findOne({name: req.params.name}).then(function (cat) {
        res.json(cat);
    });
});

module.exports = app;