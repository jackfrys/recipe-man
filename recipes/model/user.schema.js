var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    email: String,
    name: String,
    username: String,
    password: String
}, {collection: "user"});
module.exports = userSchema;