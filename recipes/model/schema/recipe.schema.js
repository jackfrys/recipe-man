var mongoose = require("mongoose");
var recipeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    steps: {type: [String], default: []},
    ingredients: [{
        name: String,
        quantity: Number,
        unit: String
    }],
    shared: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel"
        }],
        default: []
    },
    categories: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "CategoryModel"
        }],
        default: []
    },
    title: {type: String, default: ""}
}, {collection: "Recipe"});
module.exports = recipeSchema;