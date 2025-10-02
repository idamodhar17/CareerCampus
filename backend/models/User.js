const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },

  role: {
    type: String,
    enum: ["student", "professional", "recruiter", "mentor"],
    default: "student",
  },

  intent: {
    type: String,
    enum: ["career_guidance", "job_search", "internship_search"],
    default: "career_guidance",
  },

  profile: {
    education: [String],
    interests: [String],
    goals: [String],
    skills: [String],
  },

  resume: {
    email: String,
    phone: String,
    github: String,
    linkedin: String,
    skills: [String],
    education: [String],
    experience: [String],
    projects: [String],
    ats_score: Number,
  },

  verified: { type: Boolean, default: false },

  readiness_score: { type: Number, default: 0 },

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
