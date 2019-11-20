const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schoolSchema = new Schema({
  question_id: String,
  user_id: String,
  school: { type: String, text: true }
});

module.exports = mongoose.model("School", schoolSchema);