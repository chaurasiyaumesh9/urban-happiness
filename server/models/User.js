const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  accountHolderName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  addressProof: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  idProof: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  },
  photo: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  userType: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
