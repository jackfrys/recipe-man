var mongoose = require("mongoose");
var pantrySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        rel: "User"
    },
    ingredients: [{
        name: String,
        quantity: Number,
    }],
    shared: [{
        type: mongoose.Schema.Types.ObjectId,
        rel: "User"
    }]
}, {collection: "pantry"});
module.exports = pantrySchema;