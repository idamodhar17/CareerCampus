const User = require("../models/User");

// 1. Get profile
exports.getProfile = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  res.json({ status: "success", user });
};

// 2. Update profile
exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const updates = req.body;

  const user = await User.findByIdAndUpdate(userId, updates, { new: true });
  res.json({ status: "success", user });
};
