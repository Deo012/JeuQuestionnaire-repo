const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
    _id: String,
    name: String,
    password: String,
    age:Number
});

module.exports = mongoose.model("users",userSchema);