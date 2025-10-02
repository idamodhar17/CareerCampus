const Roadmap = require("../models/Roadmap");

// 1. Get user's roadmap for a career
exports.getRoadmap = async (req, res) => {
  const { careerId } = req.params;
  const userId = req.user.id;

  const roadmap = await Roadmap.findOne({ user: userId, career: careerId });
  res.json({ status: "success", roadmap });
};

// 2. Update step completion
exports.updateStep = async (req, res) => {
  const { roadmapId, stepNumber } = req.params;

  const roadmap = await Roadmap.findById(roadmapId);
  const step = roadmap.steps.find(s => s.step_number === parseInt(stepNumber));
  if (step) step.completed = true;

  const completedSteps = roadmap.steps.filter(s => s.completed).length;
  roadmap.progress_percentage = (completedSteps / roadmap.steps.length) * 100;

  await roadmap.save();
  res.json({ status: "success", roadmap });
};
