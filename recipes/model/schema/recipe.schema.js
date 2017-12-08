var mongoose = require("mongoose");
var recipeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        rel: "User"
    },
    steps: {type: [String], default: ""},
    ingredients: [{
        name: String,
        quantity: Number,
        unit: String
    }],
    shared: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            rel: "User"
        }],
        default: []
    },
    categories: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            rel: "Category"
        }],
        default: []
    },
    title: {type: String, default: ""}
}, {collection: "Recipe"});
module.exports = recipeSchema;