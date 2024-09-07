const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const questionSchema = new Schema({
    _id: Int16Array,
    question: String,
    option:[String],
    answer:Number
});

module.exports = mongoose.model("questionModel", questionSchema);