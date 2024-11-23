const {
  createContactInDB,
  getAllContactsFromDB,
  deleteContactInDB,
  createWhatsappContactInDB,
  getAllWhatsappContactsFromDB,
  deleteWhatsappContactInDB,
  updateWhatsappContactInDB,
} = require("../models/contactModel");

// Helper function to handle creation logic
const createContactHandler = (createFunction) => async (req, res) => {
  const { name, phoneNumber } = req.body;

  // Validate input
  if (!name || !phoneNumber) {
    return res
      .status(400)
      .json({ message: "Name and phone number are required" });
  }

  try {
    const contactId = await createFunction(name, phoneNumber);
    res
      .status(201)
      .location(`/api/contacts/${contactId}`)
      .json({
        message: "Contact saved successfully!",
        contact: { id: contactId, name, phoneNumber },
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to save contact", error: err.message });
  }
};

const updateContactHandler = (updatefn) => async (req, res) => {
  const { id } = req.params;
  const { name, phoneNumber } = req.body;
  console.log({id, name, phoneNumber})
  // Validate input
  if (!name || !phoneNumber || !id) {
    return res
      .status(400)
      .json({ message: "Name and phone number are required" });
  }

  try {
    const contactId = await updatefn(id, name, phoneNumber);
    res
      .status(201)
      .location(`/api/contacts/${contactId}`)
      .json({
        message: "Contact saved successfully!",
        contact: { id: contactId, name, phoneNumber },
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to save contact", error: err.message });
  }
};
// Helper function to handle retrieval logic
const getAllContactsHandler = (getAllFunction) => async (req, res) => {
  try {
    const contacts = await getAllFunction();
    res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to retrieve contacts", error: err.message });
  }
};

// Helper function to handle deletion logic
const deleteContactHandler = (deleteFunction) => async (req, res) => {
  const { id } = req.params;

  try {
    const rowsDeleted = await deleteFunction(id);

    if (rowsDeleted === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to delete contact", error: err.message });
  }
};

// Export handlers for linecontacts
const createContact = createContactHandler(createContactInDB);
const getAllContacts = getAllContactsHandler(getAllContactsFromDB);
const deleteContact = deleteContactHandler(deleteContactInDB);

// Export handlers for whatsappcontacts
const createWhatsappContact = createContactHandler(createWhatsappContactInDB);
const updateWhatsappContact = updateContactHandler(updateWhatsappContactInDB);
const getAllWhatsappContacts = getAllContactsHandler(
  getAllWhatsappContactsFromDB
);
const deleteWhatsappContact = deleteContactHandler(deleteWhatsappContactInDB);

module.exports = {
  createContact,
  getAllContacts,
  deleteContact,
  createWhatsappContact,
  updateWhatsappContact,
  getAllWhatsappContacts,
  deleteWhatsappContact,
};
