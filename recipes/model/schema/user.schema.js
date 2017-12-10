var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    email: {type: String, default: ""},
    name: {type: String, default: ""},
    username: {type: String, unique: true},
    password: {type: String, default: "alpine"},
    admin: Boolean
}, {collection: "User"});
module.exports = userSchema;