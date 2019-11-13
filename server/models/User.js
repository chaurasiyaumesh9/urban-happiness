const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  username: { type: String },
  password: String,
  contact: Number,
  aadhar: String,
  address: String
});

module.exports = mongoose.model("User", UserSchema);
