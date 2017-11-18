var mongoose = require("mongoose");
var categorySchema = mongoose.Schema({
    name: String,
    description: String
}, {collection: "Category"});
module.exports = categorySchema;