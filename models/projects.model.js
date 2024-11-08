const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Too short product link"],
    },
    type: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Too short product type"],
      maxlength: [100, "Too long product type"],
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Too short product title"],
      maxlength: [100, "Too long product title"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [20, "Too short product description"],
    },
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Projects", projectSchema);
