const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const classSchema = new Schema({
  question_id: String,
  user_id: String,
  class: { type: String, text: true }
});

module.exports = mongoose.model("Class", classSchema);