const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required:true},
    password: {type: String, required:true}
});

const Active = mongoose.model("active", userSchema);

module.exports = {Active};