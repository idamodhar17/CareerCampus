const mongoose = require("mongoose");

const skillGapSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  career: { type: mongoose.Schema.Types.ObjectId, ref: "Career", required: true },
  missing_skills: [String],
}, { timestamps: true });

module.exports = mongoose.model("SkillGap", skillGapSchema);
