const supabase = require("../config/supabase");

// 1. Middleware to verify Supabase JWT token
const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ status: "error", message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const { data: user, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({ status: "error", message: "Invalid token" });
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.user_metadata?.role || "job_seeker",
    };

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Server error in auth middleware" });
  }
};

// 2. Middleware to check user role
const requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ status: "error", message: "Access forbidden" });
  }
  next();
};

module.exports = { requireAuth, requireRole };
