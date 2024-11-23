const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch admin by email
    const admin = await Admin.findByEmail(email);

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" }); // Email not found
    }

    // Compare the plain text password (Note: insecure, see security warning below)
    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" }); // Password mismatch
    }

    // Create payload for JWT
    const payload = {
      adminId: admin.id,
      email: admin.email,
    };

    // Sign and create JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { login };
