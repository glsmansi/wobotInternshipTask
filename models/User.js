const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  token: { type: String },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
