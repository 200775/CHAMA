
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "member"],
    default: "member"
  }
});


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "member"],
    default: "member"
  }
});

module.exports = mongoose.model("User", userSchema);