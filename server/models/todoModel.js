const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Title is required. Please enter a title for your post."],
    },
    stack: {
      type: String,
      required: [
        true,
        "Description is required. Please enter a description for your post.",
      ],
    },
    description: {
      type: String,
      required: [
        true,
        "Description is required. Please enter a description for your post.",
      ],
    },
    image: {
      type: String,
      required: [
        true,
        "Image is required. Please upload an image for your post.",
      ],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "User ID is required. Please enter a valid user ID."],
    },
  },
  { timestamps: true }
);

const todoModel = mongoose.model("Todo", todoSchema);

module.exports = todoModel;
