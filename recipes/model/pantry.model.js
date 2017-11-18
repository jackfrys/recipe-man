var mongoose = require("mongoose");
var pantrySchema = require("./schema/pantry.schema");
var db = require("database");
var pantryModel = mongoose.model("PantryModel", pantrySchema);

pantryModel.pantryForUser = function (userId) {
    return pantryModel.findOne({user:mongoose.Schema.Types.ObjectId(userId)});
};

pantryModel.updatePantry = function (pantryId, pantry) {
    return pantryModel.findByIdAndUpdate(pantryId, {$set:pantry});
};

pantryModel.addPantryForUser = function (userId, pantry) {
    pantry.user = mongoose.Schema.Types.ObjectId(userId);
    return pantryModel.create(pantry);
};

module.exports = pantryModel;