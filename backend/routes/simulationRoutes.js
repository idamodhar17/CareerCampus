const express = require("express");
const router = express.Router();
const { generateSimulation } = require("../controllers/simulationController");
const { requireAuth } = require("../middleware/authMiddleware");

// 1. Generate career day-in-life simulation
router.post("/:careerId", requireAuth, generateSimulation);

module.exports = router;
