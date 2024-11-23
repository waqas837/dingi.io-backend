const SimPlan = require("../models/updateSimPlanModel");

// Create a new SIM plan
const createSimPlan = async (req, res) => {
  const { planName, price, dataAllowance, effectiveDate } = req.body;

  if (!planName || !price || !dataAllowance || !effectiveDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newPlan = await SimPlan.createPlan({
      planName,
      price,
      dataAllowance,
      effectiveDate,
    });
    res.status(201).json({
      message: "SIM plan created successfully",
      plan: newPlan,
    });
  } catch (error) {
    console.error("Error in createSimPlan:", error);
    res
      .status(500)
      .json({ message: "Error creating the SIM plan", error: error.message });
  }
};

// Update an existing SIM plan
const updateSimPlan = async (req, res) => {
  const { id } = req.params; // Get the plan ID from the route parameter
  const { planName, price, dataAllowance, effectiveDate } = req.body;

  if (!planName && !price && !dataAllowance && !effectiveDate) {
    return res
      .status(400)
      .json({ message: "At least one field must be provided for update" });
  }

  try {
    const updatedPlan = await SimPlan.updatePlan(id, {
      planName,
      price,
      dataAllowance,
      effectiveDate,
    });

    if (!updatedPlan) {
      return res.status(404).json({ message: "SIM plan not found" });
    }

    res.status(200).json({
      message: "SIM plan updated successfully",
      plan: updatedPlan,
    });
  } catch (error) {
    console.error("Error in updateSimPlan:", error);
    res
      .status(500)
      .json({ message: "Error updating the SIM plan", error: error.message });
  }
};

// Delete a SIM plan
const deleteSimPlan = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPlan = await SimPlan.deletePlan(id);

    res.status(200).json({
      message: "SIM plan deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteSimPlan:", error);
    res
      .status(500)
      .json({ message: "Error deleting the SIM plan", error: error.message });
  }
};
// Get all SIM plans
const getAllSimPlans = async (req, res) => {
  try {
    const plans = await SimPlan.getAllPlans();

    res.status(200).json({
      message: "SIM plans retrieved successfully",
      plans: plans,
    });
  } catch (error) {
    console.error("Error in getAllSimPlans:", error);
    res
      .status(500)
      .json({ message: "Error retrieving SIM plans", error: error.message });
  }
};

module.exports = {
  createSimPlan,
  updateSimPlan,
  deleteSimPlan,
  getAllSimPlans,
};
