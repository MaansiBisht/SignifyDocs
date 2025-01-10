const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  displayName: { type: String },
  role: { type: String, default: "user" }, // Default role
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
