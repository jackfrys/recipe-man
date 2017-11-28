var mongoose = require("mongoose");
var pantrySchema = mongoose.Schema({
    name: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        rel: "User"
    },
    ingredients: [{
        name: String,
        quantity: Number,
        unit: String
    }]
}, {collection: "Pantry"});
module.exports = pantrySchema;