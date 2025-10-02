const axios = require("axios");
const User = require("../models/User");
const FormData = require("form-data");

// 1. Call FastAPI ML endpoint to upload/analyze resume
exports.uploadResume = async (req, res) => {
  const userId = req.user.id;
  const file = req.file;

  try {
    const form = new FormData();
    form.append("user_id", userId);
    form.append("file", file.buffer, file.originalname);

    const response = await axios.post("http://localhost:4000/resume/upload", form, {
      headers: form.getHeaders(),
    });

    await User.findByIdAndUpdate(userId, { resume: response.data.resume });
    res.json({ status: "success", resume: response.data.resume });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
