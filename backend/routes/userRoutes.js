const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("../controllers/userController");
const { requireAuth } = require("../middleware/authMiddleware");

// 1. Get profile
router.get("/profile", requireAuth, getProfile);

// 2. Update profile
router.put("/profile", requireAuth, updateProfile);

module.exports = router;
