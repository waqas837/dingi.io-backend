const db = require("../db/db");

const Admin = {
  findByEmail: async (email) => {
    let connection;
    try {
      connection = await db.pool.getConnection();
      const [rows] = await connection.query(
        "SELECT * FROM admin WHERE email = ?",
        [email]
      );
      return rows[0];
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
        "SELECT * FROM admin WHERE id = ?",
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

module.exports = Admin;
