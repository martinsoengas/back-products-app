const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
  { versionKey: false }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
