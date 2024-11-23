const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const userController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Validate input
      if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      // Check existing user
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Create new user
      const newUser = await User.create({
        username,
        email,
        password,
      });

      // Generate token
      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      res.status(201).json({
        message: "User registered successfully",
        token,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({
        message: "Server error",
        details: error.message,
      });
    }
  },

  userLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (password !== user.password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        message: "Server error",
        details: error.message,
      });
    }
  },
};

module.exports = userController;
