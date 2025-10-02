const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mentor_type: { type: String, enum: ["Career Coach", "Resume Expert", "Interviewer"] },
  messages: [
    {
      sender: { type: String, enum: ["user", "mentor"] },
      text: String,
      timestamp: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Chat", chatSchema);
