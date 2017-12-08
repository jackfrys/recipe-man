var mongoose = require("mongoose");
var categorySchema = mongoose.Schema({
    name: {type: String, default: ""},
    description: {type: String, default: ""},
}, {collection: "Category"});
module.exports = categorySchema;