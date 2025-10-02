const mongoose = require("mongoose");

const simulationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  career: { type: mongoose.Schema.Types.ObjectId, ref: "Career" },
  simulation_text: String
}, { timestamps: true });

module.exports = mongoose.model("Simulation", simulationSchema);
