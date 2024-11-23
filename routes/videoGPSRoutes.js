const express = require("express");
const upload = require("../middlewares/multerConfig"); // Import the multer
const { authenticateAdmin } = require("../middlewares/authMiddleware");
const {
  uploadVideo,
  getAllVideos,
  deleteVideo,
} = require("../controllers/videoGPSController");

const router = express.Router();

// Route to upload multiple videos
router.post("/upload", authenticateAdmin, upload, uploadVideo); // Handles multiple files upload

// Route to get all videos
router.get("/", getAllVideos);
// Route to delete a video by ID
router.delete("/:id", authenticateAdmin, deleteVideo);

module.exports = router;
