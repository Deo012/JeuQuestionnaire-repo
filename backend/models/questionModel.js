const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const questionSchema = new Schema({
    _id: Number,
    question: String,
    answer: Boolean
});

module.exports = mongoose.model("questions", questionSchema);