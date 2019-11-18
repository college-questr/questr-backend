const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    question_id: String,
    tag: String
});

module.exports = mongoose.model("Tags", tagSchema);