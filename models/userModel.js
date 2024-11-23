const db = require("../db/db");

const User = {
  findByEmail: async (email) => {
    let connection;
    try {
      connection = await db.pool.getConnection();
      const [rows] = await connection.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      return rows[0];
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    } finally {
      if (connection) connection.release();
    }
  },

  create: async (userData) => {
    let connection;
    try {
      connection = await db.pool.getConnection();
      const { username, email, password } = userData;
      const [result] = await connection.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, password]
      );
      return { id: result.insertId, username, email };
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    } finally {
      if (connection) connection.release();
    }
  },

  findById: async (id) => {
    let connection;
    try {
      connection = await db.pool.getConnection();
      const [rows] = await connection.query(
        "SELECT * FROM users WHERE id = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    } finally {
      if (connection) connection.release();
    }
  },
};

module.exports = User;
