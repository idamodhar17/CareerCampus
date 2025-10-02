const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
app.use(express.json());

// Auth routes
app.use("/api/auth", require("./routes/authRoutes"));
// User routes
app.use("/api/users", require("./routes/userRoutes"));
// Career routes
app.use("/api/careers", require("./routes/careerRoutes"));
// Roadmap routes
app.use("/api/roadmaps", require("./routes/roadmapRoutes"));
// Chat routes
app.use("/api/chats", require("./routes/chatRoutes"));
// Resume routes
app.use("/api/resume", require("./routes/resumeRoutes"));
// Simulation routes
app.use("/api/simulations", require("./routes/simulationRoutes"));

// Health check
app.get("/", (req, res) => res.send("CareerCompass AI Backend Running"));


// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
