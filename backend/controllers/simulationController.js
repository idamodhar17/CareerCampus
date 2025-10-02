const axios = require("axios");
const Simulation = require("../models/Simulation"); // Optional: if you want to save simulations

// 1. Generate career day-in-life simulation
exports.generateSimulation = async (req, res) => {
  const userId = req.user.id;
  const { careerId } = req.params;

  try {
    const response = await axios.post("http://localhost:4000/simulation", {
      user_id: userId,
      career_id: careerId
    });

    const simulationText = response.data.simulation;

    res.json({ status: "success", simulation: simulationText });
  } catch (err) {
    console.error("Simulation generation error:", err.message);
    res.status(500).json({ status: "error", message: "Failed to generate simulation" });
  }
};
