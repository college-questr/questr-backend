const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, text: true },
  password: { type: String, text: true },
});

module.exports = mongoose.model("User", userSchema);