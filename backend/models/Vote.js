const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true }, // Ensure one vote per user
    candidate: { type: String, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Vote", voteSchema);
