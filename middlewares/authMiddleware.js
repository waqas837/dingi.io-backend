const jwt = require("jsonwebtoken");

const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // Attach admin info to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = { authenticateAdmin };
