const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

const adminController = {
  adminLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const admin = await Admin.findByEmail(email);
      console.log("Admin found:", admin);

      if (!admin) {
        return res.status(401).json({ message: "Invalid admin credentials" });
      }

      if (password !== admin.password) {
        return res.status(401).json({ message: "Invalid admin credentials" });
      }

      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
      }

      const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      res.json({
        token,
        admin: { id: admin.id, email: admin.email },
      });
    } catch (error) {
      console.error("Login error:", error.message);
      res.status(500).json({
        message: "Server error",
        details: error.message,
      });
    }
  },
};

module.exports = adminController;
