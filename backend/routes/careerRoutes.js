const express = require("express");
const router = express.Router();
const { getCareers, getSkillGap } = require("../controllers/careerController");
const { requireAuth } = require("../middleware/authMiddleware");

// 1. Get career suggestions
router.get("/", requireAuth, getCareers);

// 2. Get skill gap for a specific career
router.get("/:careerId/skill-gap", requireAuth, getSkillGap);

module.exports = router;
