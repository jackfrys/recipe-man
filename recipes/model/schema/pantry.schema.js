var mongoose = require("mongoose");
var pantrySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        rel: "User"
    },
    ingredients: [{
        name: String,
        quantity: Number,
    }]
}, {collection: "Pantry"});
module.exports = pantrySchema;