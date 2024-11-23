const express = require("express");
const router = express.Router();
const simPlanController = require("../controllers/updateSimPlanController");
const { authenticateAdmin } = require("../middlewares/authMiddleware"); // Import the admin authentication middleware

// Create a new SIM plan (only admin can access)
router.post("/create", authenticateAdmin, simPlanController.createSimPlan);

// Update an existing SIM plan (only admin can access)
router.put("/update/:id", authenticateAdmin, simPlanController.updateSimPlan);

// Delete a SIM plan (only admin can access)
router.delete(
  "/delete/:id",
  authenticateAdmin,
  simPlanController.deleteSimPlan
);

// Show all SIM plans (no authentication needed for viewing)
router.get("/all", simPlanController.getAllSimPlans);

module.exports = router;
