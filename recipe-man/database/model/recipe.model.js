var mongoose = require("mongoose");
var recipeSchema = require("../schema/recipe.schema");
var db = require("../database");
var recipeModel = mongoose.model("RecipeModel", recipeSchema);

recipeModel.createRecipe = function (userId, recipe) {
    recipe.user = mongoose.Types.ObjectId(userId);
    return recipeModel.create(recipe);
};

recipeModel.recipesByUser = function (userId) {
    return recipeModel.find({user: mongoose.Types.ObjectId(userId)}).populate("categories");
};

recipeModel.sharedWithUser = function (userId) {
    return recipeModel.find({shared: mongoose.Types.ObjectId(userId)}).populate("categories");
};

recipeModel.recipeById = function (recipeId) {
    return recipeModel.findById(recipeId).populate("categories").populate("shared");
};

recipeModel.updateRecipe = function (recipeId, recipe) {
    return recipeModel.findByIdAndUpdate(recipeId, {$set: recipe});
};

recipeModel.shareRecipe = function (recipeId, userId) {
    return recipeModel.findByIdAndUpdate(recipeId, {$push: {shared: mongoose.Types.ObjectId(userId)}});
};

recipeModel.deleteRecipe = function (recipeId) {
    return recipeModel.findByIdAndRemove(recipeId);
};

recipeModel.addCategory = function (recipeId, categoryId) {
    return recipeModel.findByIdAndUpdate(recipeId, {$push: {categories: mongoose.Types.ObjectId(categoryId)}});
};

recipeModel.removeCategory = function (recipeId, categoryId) {
    return recipeModel.findByIdAndUpdate(recipeId, {$pullAll: {categories: mongoose.Types.ObjectId(categoryId)}});
};

recipeModel.allRecipes = function () {
    return recipeModel.find({}).populate("user");
};

module.exports = recipeModel;