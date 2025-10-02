const Career = require("../models/Career");
const SkillGap = require("../models/SkillGap");
const Roadmap = require("../models/Roadmap");

// 1. Get career suggestions
exports.getCareers = async (req, res) => {
  const careers = await Career.find();
  res.json({ status: "success", careers });
};

// 2. Get skill gaps for user + career
exports.getSkillGap = async (req, res) => {
  const { careerId } = req.params;
  const userId = req.user.id;

  const skillGap = await SkillGap.findOne({ user: userId, career: careerId });
  res.json({ status: "success", skillGap });
};
