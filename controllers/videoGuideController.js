const {
  createVideoInDB,
  getAllVideosFromDB,
  deleteVideoInDB,
} = require("../models/videGuide");

// Upload a new video
const uploadVideo = async (req, res) => {
  const { title, description } = req.body;
  const videoPath = req.files ? req.files[0].filename : null;
   console.log("videoPath", videoPath)
  if (!videoPath) {
    return res.status(400).json({ message: "No video file uploaded" });
  }

  try {
    const videoId = await createVideoInDB(title, description, videoPath);
    res.status(201).json({
      message: "Video uploaded successfully!",
      video: { id: videoId, title, description, videoPath },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload video" });
  }
};

// Get all videos
const getAllVideos = async (req, res) => {
  try {
    const videos = await getAllVideosFromDB();
    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve videos" });
  }
};

// Delete a video by ID
const deleteVideo = async (req, res) => {
  const { id } = req.params;

  try {
    const rowsDeleted = await deleteVideoInDB(id);
    if (rowsDeleted === 0) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete video" });
  }
};

module.exports = {
  uploadVideo,
  getAllVideos,
  deleteVideo,
};
