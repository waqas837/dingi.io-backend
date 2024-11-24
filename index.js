require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const initDatabase = require("./db/init");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");
const videoRoutes = require("./routes/videoGuideRoutes");
const simPlanRoutes = require("./routes/updateSimPlanRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
// Security Middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors());

// Request parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging Middleware
app.use(morgan("dev"));

// Static file serving for uploaded videos
app.use("/", express.static(path.join(__dirname, "public/images")));
app.use("/", express.static(path.join(__dirname, "public/videos")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/guidevideos", videoRoutes);
app.use("/api/gpsvideos", videoRoutes);
app.use("/api/sim-plans", simPlanRoutes);
app.use("/api/blogs", blogRoutes);

// Default Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Car Service API!",
    status: "active",
    timestamp: new Date(),
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(`[Error]: ${err.message}`);
  console.error(`[Stack]: ${err.stack}`);

  res.status(err.status || 500).json({
    message: err.message || "Something went wrong!",
    status: "error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Server Startup
const startServer = async () => {
  try {
    // Initialize database
    await initDatabase();
    console.log("Database initialized successfully");

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`📄 API Documentation: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Handle Unhandled Rejections
process.on("unhandledRejection", (err) => {
  console.error("⚠️ Unhandled Rejection:", err);
  process.exit(1);
});

startServer();

module.exports = app; // For testing
