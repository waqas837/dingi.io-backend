const express = require("express");
const {
  createContact,
  getAllContacts,
  deleteContact,
  createWhatsappContact,
  getAllWhatsappContacts,
  deleteWhatsappContact,
  updateWhatsappContact,
} = require("../controllers/contactController");

const { authenticateAdmin } = require("../middlewares/authMiddleware"); // Import the authentication middleware

const router = express.Router();

// Line Contacts Routes

// Route to create a new contact (only admin can access)
router.post("/", authenticateAdmin, createContact);

// Route to get all contacts (no authentication needed)
router.get("/", getAllContacts);

// Route to delete a contact by ID (only admin can access)
router.delete("/:id", authenticateAdmin, deleteContact);

// Whatsapp Contacts Routes

// Route to create a new contact (only admin can access)
router.post("/whatsapp/", authenticateAdmin, createWhatsappContact);

router.put("/whatsapp/:id", authenticateAdmin, updateWhatsappContact);

// Route to get all whatsapp contacts (no authentication needed)
router.get("/whatsapp/", getAllWhatsappContacts);

// Route to delete a whatsapp contact by ID (only admin can access)
router.delete("/whatsapp/:id", authenticateAdmin, deleteWhatsappContact);

module.exports = router;
