const { pool } = require("../db/db");

const SimPlan = {
  createPlan: async (planData) => {
    let connection;
    try {
      connection = await pool.getConnection();
      console.log("Creating new plan with data:", planData);

      const { planName, price, dataAllowance, effectiveDate } = planData;

      const [result] = await connection.query(
        `INSERT INTO sim_plans (plan_name, price, data_allowance, effective_date) 
         VALUES (?, ?, ?, ?)`,
        [planName, price, dataAllowance, effectiveDate]
      );

      console.log(`Created plan with ID: ${result.insertId}`);
      return { id: result.insertId, ...planData };
    } catch (error) {
      console.error("Database error in createPlan:", error);
      throw new Error(`Failed to create plan: ${error.message}`);
    } finally {
      if (connection) {
        try {
          await connection.release();
        } catch (releaseError) {
          console.error("Error releasing connection:", releaseError);
        }
      }
    }
  },

  // Update an existing SIM plan
  updatePlan: async (id, planData) => {
    let connection;
    try {
      connection = await pool.getConnection();
      console.log("Updating plan with ID:", id, "Data:", planData);

      const { planName, price, dataAllowance, effectiveDate } = planData;

      const [result] = await connection.query(
        `UPDATE sim_plans 
         SET plan_name = ?, price = ?, data_allowance = ?, effective_date = ? 
         WHERE id = ?`,
        [planName, price, dataAllowance, effectiveDate, id]
      );

      if (result.affectedRows === 0) {
        return null; // No plan found with the provided ID
      }

      return { id, planName, price, dataAllowance, effectiveDate };
    } catch (error) {
      console.error("Database error in updatePlan:", error);
      throw new Error(`Failed to update plan: ${error.message}`);
    } finally {
      if (connection) {
        try {
          await connection.release();
        } catch (releaseError) {
          console.error("Error releasing connection:", releaseError);
        }
      }
    }
  },

  // Delete a SIM plan
  deletePlan: async (id) => {
    let connection;
    try {
      connection = await pool.getConnection();
      console.log("Deleting plan with ID:", id);

      const [result] = await connection.query(
        `DELETE FROM sim_plans WHERE id = ?`,
        [id]
      );

      if (result.affectedRows === 0) {
        return null; // No plan found with the provided ID
      }

      return true; // Successful deletion
    } catch (error) {
      console.error("Database error in deletePlan:", error);
      throw new Error(`Failed to delete plan: ${error.message}`);
    } finally {
      if (connection) {
        try {
          await connection.release();
        } catch (releaseError) {
          console.error("Error releasing connection:", releaseError);
        }
      }
    }
  },

  // Get all SIM plans
  getAllPlans: async () => {
    let connection;
    try {
      connection = await pool.getConnection();
      console.log("Fetching all SIM plans");

      const [plans] = await connection.query(
        `SELECT id, plan_name, price, data_allowance, effective_date FROM sim_plans`
      );

      return plans;
    } catch (error) {
      console.error("Database error in getAllPlans:", error);
      throw new Error(`Failed to fetch plans: ${error.message}`);
    } finally {
      if (connection) {
        try {
          await connection.release();
        } catch (releaseError) {
          console.error("Error releasing connection:", releaseError);
        }
      }
    }
  },
};

module.exports = SimPlan;
