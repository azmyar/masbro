const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String},
    post: {type: String, required:true},
    date: {type: String},
    bestbro: {type: String},
});

const Post = mongoose.model("post", userSchema);

module.exports = {Post};