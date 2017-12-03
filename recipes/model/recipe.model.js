var mongoose = require("mongoose");
var recipeSchema = require("./schema/recipe.schema");
var db = require("./database");
var recipeModel = mongoose.model("RecipeModel", recipeSchema);

recipeModel.createRecipe = function (userId, recipe) {
    recipe.user = userId;
    return recipeModel.create(recipe);
};

recipeModel.recipesByUser = function (userId) {
    return recipeModel.find({user:userId});
};

recipeModel.sharedWithUser = function (userId) {
    return recipeModel.find({shared:{$in:[mongoose.Schema.Types.ObjectId(userId)]}});
};

recipeModel.updateRecipe = function (recipeId, recipe) {
    return recipeModel.findByIdAndUpdate(recipeId, {$set:recipe});
};

recipeModel.shareRecipe = function (recipeId, userId) {
    return recipeModel.findByIdAndUpdate(recipeId, {$push:{shared:mongoose.Schema.Types.ObjectId(userId)}});
};

recipeModel.deleteRecipe = function (recipeId) {
    return recipeModel.findByIdAndRemove(recipeId);
};

recipeModel.addCategory = function (recipeId, categoryId) {
    return recipeModel.findByIdAndUpdate(recipeId, {$push:{categories:categoryId}});
};

recipeModel.removeCategory = function (recipeId, categoryId) {
    return recipeModel.findByIdAndUpdate(recipeId, {$pullAll:{categories:categoryId}});
};

recipeModel.allRecipes = function () {
    return recipeModel.find({});
};

module.exports = recipeModel;