var mongoose = require("mongoose");
var userSchema = require("../schema/user.schema");
var db = require("../database");
var userModel = mongoose.model("UserModel", userSchema);

userModel.createUser = function (user) {
    return userModel.create(user);
};

userModel.updateUser = function (id, user) {
    return userModel.findByIdAndUpdate(id, {$set: user});
};

userModel.getUser = function (id) {
    return userModel.findById(id);
};

userModel.deleteUser = function (id) {
    return userModel.findByIdAndRemove(id);
};

userModel.findByCredentials = function (username, password) {
    return userModel.find({username: username, password: password});
};

userModel.allUsers = function () {
    return userModel.find({});
};

module.exports = userModel;