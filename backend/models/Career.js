const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  required_skills: [String],
  roadmap: [
    {
      step: Number,
      action: String,
      type: { type: String },
      resource_link: String
    }
  ],
  long_term_path: [String],
}, { timestamps: true });

module.exports = mongoose.model("Career", careerSchema);
