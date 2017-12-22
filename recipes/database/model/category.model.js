var mongoose = require("mongoose");
var categorySchema = require("../schema/category.schema");
var db = require("../database");
var categoryModel = mongoose.model("CategoryModel", categorySchema);

categoryModel.categoryForId = function (categoryId) {
    return categoryModel.findById(categoryId);
};

categoryModel.allCategories = function () {
    return categoryModel.find({});
};

categoryModel.createCategory = function (category) {
    return categoryModel.create(category);
};

categoryModel.modifyCategory = function (cid, category) {
    return categoryModel.findByIdAndUpdate(cid, category);
};

categoryModel.deleteCategory = function (cid) {
    return categoryModel.findByIdAndRemove(cid);
};

module.exports = categoryModel;