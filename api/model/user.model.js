const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },
  refreshToken: {
    type: String, // Store refresh token
    default: null,
  },
});
const User = mongoose.model("User", registerSchema);

module.exports = { User };
