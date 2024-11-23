const { pool } = require("../db/db");

class Blog {
  static async createBlog(title, content, image) {
    try {
      const query =
        "INSERT INTO blogs (title, content, image) VALUES (?, ?, ?)";
      const [result] = await pool.execute(query, [title, content, image]);
      return result;
    } catch (err) {
      throw err;
    }
  }
  static async gpstrackerguides(title, description, content, image) {
    try {
      const query =
        "INSERT INTO gpstrackerguides (title, description, content, image) VALUES (?, ?, ?, ?)";
      const [result] = await pool.execute(query, [
        title,
        description,
        content,
        image,
      ]);
      return result;
    } catch (err) {
      throw err;
    }
  }
  static async getAllBlogs(req) {
    let limit = req.query.limit;
    try {
      const query = "SELECT * FROM blogs ORDER BY created_at DESC LIMIT ?";
      const [results] = await pool.execute(query, [parseInt(limit)]);
      return results;
    } catch (err) {
      throw err;
    }
  }

  static async getBlogById(id) {
    try {
      const query = "SELECT * FROM gpstrackerguides WHERE id = ?";
      const [result] = await pool.execute(query, [id]);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async updateBlog(id, title, content, image) {
    try {
      const query =
        "UPDATE blogs SET title = ?, content = ?, image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
      const [result] = await pool.execute(query, [title, content, image, id]);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async deleteBlog(id) {
    try {
      const query = "DELETE FROM blogs WHERE id = ?";
      const [result] = await pool.execute(query, [id]);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Blog;
