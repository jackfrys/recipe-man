var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    email: String,
    name: String,
    username: String,
    password: String,
    admin: Boolean
}, {collection: "User"});
module.exports = userSchema;