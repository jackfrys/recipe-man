var mongoose = require("mongoose");
var pantrySchema = require("../schema/pantry.schema");
var db = require("../database");
var pantryModel = mongoose.model("PantryModel", pantrySchema);

pantryModel.pantryForUser = function (userId) {
    return pantryModel.find({user: mongoose.Types.ObjectId(userId)});
};

pantryModel.updatePantry = function (pantryId, pantry) {
    return pantryModel.findByIdAndUpdate(pantryId, {$set: pantry});
};

pantryModel.addPantryForUser = function (userId, pantry) {
    pantry.user = mongoose.Types.ObjectId(userId);
    return pantryModel.create(pantry);
};

pantryModel.allPantries = function () {
    return pantryModel.find({});
};

module.exports = pantryModel;