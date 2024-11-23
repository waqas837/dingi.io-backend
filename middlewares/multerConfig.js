const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create directories for videos and images
const videosDir = path.join(__dirname, "..", "public", "videos");
const imagesDir = path.join(__dirname, "..", "public", "images");

if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
}

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine the destination based on file type
    if (file.mimetype.startsWith("image/")) {
      cb(null, imagesDir); // Destination folder for images
    } else if (file.mimetype.startsWith("video/")) {
      cb(null, videosDir); // Destination folder for videos
    } else {
      cb(new Error("Invalid file type"), false); // Reject if not an image or video
    }
  },
  filename: (req, file, cb) => {
    // Remove spaces from the original file name and add timestamp for uniqueness
    const fileNameWithoutSpaces = file.originalname.trim().replace(/\s+/g, "_");
    const uniqueName = `${Date.now()}-${fileNameWithoutSpaces}`;
    cb(null, uniqueName);
  },
});

// File filter to allow only image and video files
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  const allowedVideoTypes = ["video/mp4", "video/webm", "video/quicktime"];

  if (
    allowedImageTypes.includes(file.mimetype) ||
    allowedVideoTypes.includes(file.mimetype)
  ) {
    cb(null, true); // File is allowed
  } else {
    cb(
      new Error("Invalid file type. Only images and videos are allowed."),
      false
    ); // File is rejected
  }
};

// Create and export multer instance for handling multiple file uploads
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 200 * 1024 * 1024, // Max file size of 200MB
  },
}).array("files", 10); // 'files' is the field name for the uploaded files, 10 is the max number of files

module.exports = upload;
