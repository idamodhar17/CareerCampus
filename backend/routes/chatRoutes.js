const express = require("express");
const router = express.Router();
const { sendMessage } = require("../controllers/chatController");
const { requireAuth } = require("../middleware/authMiddleware");

// 1. Send message to AI mentor
router.post("/mentor", requireAuth, sendMessage);

module.exports = router;
