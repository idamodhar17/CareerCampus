const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  career: { type: mongoose.Schema.Types.ObjectId, ref: "Career", required: true },
  steps: [
    {
      step_number: Number,
      skill: String,
      resource: String,
      completed: { type: Boolean, default: false }
    }
  ],
  progress_percentage: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Roadmap", roadmapSchema);
