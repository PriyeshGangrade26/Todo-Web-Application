const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [
        true,
        "User Name is a required field. Please enter a User Name to proceed.",
      ],
    },
    email: {
      type: String,
      required: [
        true,
        "Email is a required field. Please enter a valid email address to proceed.",
      ],
    },
    password: {
      type: String,
      required: [
        true,
        "Password is a required field. Please enter a password to proceed.",
      ],
    },
    confirmPassword: {
      type: String,
      required: [
        true,
        "Confirm Password is a required field. Please confirm your password to proceed.",
      ],
    },
    todos: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Todo",
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
