const mongoose = require("mongoose");

const documentationRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["change", "doc"],
      required: true,
    },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", documentationRequestSchema);

module.exports = Request;
