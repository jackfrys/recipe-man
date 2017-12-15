var connectionString = 'mongodb://127.0.0.1:27017/recipe-man';
if (process.env.MONGODB_URI) {
    var connectionString = process.env.MONGODB_URI;
}

var mongoose = require("mongoose");
var q = require("q");
mongoose.connect(connectionString);
mongoose.Promise = q.Promise;
module.exports = q;