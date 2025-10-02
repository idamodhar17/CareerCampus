const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadResume } = require("../controllers/resumeController");
const { requireAuth } = require("../middleware/authMiddleware");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// 1. Upload and analyze resume
router.post("/upload", requireAuth, upload.single("file"), uploadResume);

module.exports = router;
