const express = require("express");
const router = express.Router();
const { signup, verifyOtp, signin } = require("../controllers/authController");

// 1. Signup
router.post("/signup", signup);

// 1.2 Verify Email
router.post("/verify-otp", verifyOtp);

// 2. Signin
router.post("/signin", signin);

module.exports = router;
