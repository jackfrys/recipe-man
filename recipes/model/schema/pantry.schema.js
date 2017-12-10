var mongoose = require("mongoose");
var pantrySchema = mongoose.Schema({
    name: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    ingredients: {
        type: [{
            name: {type: String, default: ""},
            quantity: {type: String, default: 0},
            unit: {type: String, default: 0}
        }],
        default: []
    }
}, {collection: "Pantry"});
module.exports = pantrySchema;