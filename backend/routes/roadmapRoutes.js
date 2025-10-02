const express = require("express");
const router = express.Router();
const { getRoadmap, updateStep } = require("../controllers/roadmapController");
const { requireAuth } = require("../middleware/authMiddleware");

// 1. User roadmap for a career
router.get("/:careerId", requireAuth, getRoadmap);

// 2. Update roadmap step completion
router.put("/:roadmapId/step/:stepNumber", requireAuth, updateStep);

module.exports = router;
