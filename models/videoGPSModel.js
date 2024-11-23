const { pool } = require("../db/db");

// Insert video details into the database
const createVideoInDB = async (title, description, videoPath) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO gpsvideos (title, description, video_path) VALUES (?, ?, ?)",
      [title, description, videoPath]
    );
    return result.insertId;
  } catch (error) {
    console.error("Database Insert Error:", error);
    throw error;
  }
};

// Fetch all videos from the database
const getAllVideosFromDB = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM gpsvideos");
    return rows;
  } catch (error) {
    console.error("Database Fetch Error:", error);
    throw error;
  }
};

// Delete a video by ID
const deleteVideoInDB = async (id) => {
  try {
    const [result] = await pool.query("DELETE FROM gpsvideos WHERE id = ?", [
      id,
    ]);
    return result.affectedRows;
  } catch (error) {
    console.error("Database Delete Error:", error);
    throw error;
  }
};

module.exports = {
  createVideoInDB,
  getAllVideosFromDB,
  deleteVideoInDB,
};
