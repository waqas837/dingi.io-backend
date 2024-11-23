const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerConfig.js"); // Import the multer middleware
const blogController = require("../controllers/blogController.js");
const { authenticateAdmin } = require("../middlewares/authMiddleware"); // Import auth middleware

// Route for creating a blog (admin-only with image upload)
router.post("/create", authenticateAdmin, upload, blogController.createBlog);
router.get("/guides-gpstracker", upload, blogController.gpstrackerguidesGet);
router.post(
  "/guides-gpstracker",
  authenticateAdmin,
  upload,
  blogController.gpstrackerguidesPost
);

// Route for getting all blogs (public)
router.get("/all", blogController.getAllBlogs);

// Route for getting a single blog by its ID (public)
router.get("/:id", blogController.getBlogById);

// Route for updating a blog (admin-only with image upload)
router.put("/update/:id", authenticateAdmin, upload, blogController.updateBlog);

// Route for deleting a blog (admin-only)
router.delete("/delete/:id", authenticateAdmin, blogController.deleteBlog);

module.exports = router;
