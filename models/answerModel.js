const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    user_id: String,
    question_id: String,
    answer: String,
    votes: Number,
    createdAt: String
});

module.exports = mongoose.model("Answer", answerSchema);