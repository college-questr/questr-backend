const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    user_id: String,
    tag_id: String,
    questionTitle: String,
    questionBody: String,
    votes: Number,
    createdAt: String
});

module.exports = mongoose.model("Question", questionSchema);