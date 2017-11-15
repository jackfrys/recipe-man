var mongoose = require("mongoose");
var recipeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        rel: "User"
    },
    steps: [{
        description: String
    }],
    ingredients: [{
        name: String,
        quantity: Number,
    }]
}, {collection: "recipe"});
module.exports = recipeSchema;