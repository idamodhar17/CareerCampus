const supabase = require("../config/supabase");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validator = require("validator");

// Validate password
const isValidPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
};

// 1. Sign Up
exports.signup = async (req, res) => {
  const { email, password, name, role, intent } = req.body;

  try {
    if (!validator.isEmail(email)) {
      return res.status(400).json({ status: "error", message: "Invalid email format" });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        status: "error",
        message: "Password must be at least 8 characters, include uppercase, lowercase, and a number",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: "error", message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase.auth.signInWithOtp({ email });
    if (error) throw error;

    const user = await User.create({
      email,
      name,
      role: role || "student",
      intent: intent || "career_guidance",
      profile: {},
      resume: {},
      password: hashedPassword,
      verified: false,
    });

    res.json({
      status: "success",
      message: "OTP sent to your email. Please verify to complete signup.",
      user: { email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });
    if (error) throw error;

    if (data?.user) {
      const user = await User.findOneAndUpdate(
        { email },
        { $set: { verified: true } },
        { new: true }
      );

      return res.json({
        status: "success",
        message: "Email verified successfully! You can now login.",
        user: { email: user.email, role: user.role },
      });
    } else {
      return res.status(400).json({ status: "error", message: "OTP verification failed" });
    }
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

// 2️. Sign In
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!validator.isEmail(email)) {
      return res.status(400).json({ status: "error", message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: "error", message: "User not found" });
    }

    if (!user.verified) {
      return res.status(403).json({ status: "error", message: "Please verify your email with OTP before logging in" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: "error", message: "Incorrect password" });
    }

    res.json({ status: "success", message: "Login successful", user: { email: user.email, role: user.role } });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
