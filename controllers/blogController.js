// controllers/blogController.js
const { pool } = require("../db/db");
const Blog = require("../models/blogModel");

const createBlog = async (req, res) => {
  const { title, content } = req.body;
  const image = req.files.length > 0 ? req.files[0].filename : null; // Get the uploaded image filename

  try {
    const result = await Blog.createBlog(title, content, image);
    res
      .status(201)
      .json({ message: "Blog created successfully", blogId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating blog" });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.getAllBlogs(req);
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching blogs" });
  }
};

const getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.getBlogById(id);
    if (blog.length > 0) {
      res.status(200).json(blog[0]);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching blog" });
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const image = req.files.length > 0 ? req.files[0].filename : null; // Get the uploaded image filename

  try {
    const blog = await Blog.getBlogById(id);
    if (blog.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const result = await Blog.updateBlog(
      id,
      title,
      content,
      image || blog[0].image
    );
    res.status(200).json({ message: "Blog updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating blog" });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.getBlogById(id);
    if (blog.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await Blog.deleteBlog(id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting blog" });
  }
};

const gpstrackerguidesPost = async (req, res) => {
  const { title, description, content } = req.body;
  const image = req.files.length > 0 ? req.files[0].filename : null; // Get the uploaded image filename
  try {
    const result = await Blog.gpstrackerguides(
      title,
      description,
      content,
      image
    );
    res
      .status(201)
      .json({ message: "Blog created successfully", blogId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating blog" });
  }
};

const gpstrackerguidesGet = async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection(); // Get a connection from the pool
    const query = "SELECT * FROM gpstrackerguides ORDER BY created_at DESC";
    const [results] = await connection.execute(query);
    res.status(200).json({ message: "Blog Got successfully", data: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching blogs" });
  } finally {
    if (connection) connection.release(); // Ensure the connection is released
  }
};

const gpstrackerguidesDel = async (req, res) => {
  const { id } = req.params;
  let connection;
  try {
    connection = await pool.getConnection(); // Get a connection from the pool
    const query = "DELETE FROM gpstrackerguides WHERE id=?";
    const [results] = await connection.execute(query, [id]);
    if (results.affectedRows > 0) {
      res.status(200).json({ message: "Deleted", success: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error delete a blog" });
  } finally {
    if (connection) connection.release(); // Ensure the connection is released
  }
};

const gpstrackerguidesPut = async (req, res) => {
  const { id, title, description, content } = req.body; // Assuming `id` is part of the body for identifying the record
  const image =
    req.files && req.files.length > 0 ? req.files[0].filename : null; // Get the uploaded image filename, or null if not provided

  try {
    // If no image is uploaded, you can fetch the current image from the database first to preserve it
    const [existingGuide] = await pool.execute(
      "SELECT image FROM gpstrackerguides WHERE id = ?",
      [id]
    );

    // If there is no new image, use the current image from the database
    const currentImage = image || existingGuide[0]?.image;

    const query =
      "UPDATE gpstrackerguides SET title = ?, description = ?, content = ?, image = ? WHERE id = ?";
    const [result] = await pool.execute(query, [
      title,
      description,
      content,
      currentImage, // Use current image if no new image is uploaded
      id, // Add the id to target the correct record
    ]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Blog updated successfully" });
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating blog" });
  }
};
const gpstrackerguidesSingleGet = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "SELECT * FROM gpstrackerguides WHERE id = ?";
    const [result] = await pool.execute(query, [id]);
    if (result.length > 0) {
      res.status(200).json({ message: "Blog Got successfully", data: result });
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error get single blog" });
  }
};
module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  gpstrackerguidesPost,
  gpstrackerguidesGet,
  gpstrackerguidesDel,
  gpstrackerguidesPut,
  gpstrackerguidesSingleGet,
};
