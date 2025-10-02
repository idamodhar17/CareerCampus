const mongoose = require("mongoose");

const resumeOptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  career: { type: mongoose.Schema.Types.ObjectId, ref: "Career" },
  suggestions: [
    {
      section: String,
      text: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("ResumeOptimization", resumeOptSchema);
