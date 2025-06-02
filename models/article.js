const mongoose = require("mongoose");
const validator = require("validator"); // Make sure you have this package installed

const articleSchema = new mongoose.Schema(
  {
    keyword: {
      type: String,
      required: [true, "Keyword is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    publishedAt: {
      type: Date,
      required: [true, "Publication date is required"],
      validate: {
        validator (v) {
          return !Number.isNaN(Date.parse(v)); // Validates that it's a valid date
        },
        message: "Invalid date format",
      },
    },
    source: {
      name: {
        type: String,
        required: [true, "Source name is required"],
      },
    },
    urlToImage: {
      type: String,
      required: [true, "Image URL is required"],
      validate: {
        validator: (v) => validator.isURL(v),
        message: "Invalid URL format for image",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model("Article", articleSchema);
