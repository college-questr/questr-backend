const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
  question_id: String,
  user_id: String,
  class_id: String,
  instructor: { type: String, text: true }
});

module.exports = mongoose.model("Instructor", instructorSchema);