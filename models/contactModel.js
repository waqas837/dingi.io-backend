const { pool } = require("../db/db");

// Insert a line contact into the database
const createContactInDB = async (name, phoneNumber) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO linecontacts (name, phone_number) VALUES (?, ?)",
      [name, phoneNumber]
    );
    return result.insertId; // Return the ID of the newly created contact
  } catch (error) {
    console.error("Database Insert Error (Line Contact):", error);
    throw error;
  }
};

// Fetch all line contacts from the database
const getAllContactsFromDB = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM linecontacts");
    return rows;
  } catch (error) {
    console.error("Database Fetch Error (Line Contacts):", error);
    throw error;
  }
};

// Delete a line contact by ID
const deleteContactInDB = async (id) => {
  try {
    const [result] = await pool.query("DELETE FROM linecontacts WHERE id = ?", [
      id,
    ]);
    return result.affectedRows; // Return the number of rows deleted
  } catch (error) {
    console.error("Database Delete Error (Line Contact):", error);
    throw error;
  }
};

// Insert a WhatsApp contact into the database
const createWhatsappContactInDB = async (name, phoneNumber) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO whatsappcontacts (name, phone_number) VALUES (?, ?)",
      [name, phoneNumber]
    );
    return result.insertId; // Return the ID of the newly created contact
  } catch (error) {
    console.error("Database Insert Error (WhatsApp Contact):", error);
    throw error;
  }
};

// Insert a WhatsApp contact into the database
const updateWhatsappContactInDB = async (id, name, phoneNumber) => {
  try {
    const [result] = await pool.query(
      "UPDATE whatsappcontacts SET name = ?, phone_number = ? WHERE id = ?",
      [name, phoneNumber, id]
    );
    return result.insertId; // Return the ID of the newly created contact
  } catch (error) {
    console.error("Database Insert Error (WhatsApp Contact):", error);
    throw error;
  }
};

// Fetch all WhatsApp contacts from the database
const getAllWhatsappContactsFromDB = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM whatsappcontacts");
    return rows;
  } catch (error) {
    console.error("Database Fetch Error (WhatsApp Contacts):", error);
    throw error;
  }
};

// Delete a WhatsApp contact by ID
const deleteWhatsappContactInDB = async (id) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM whatsappcontacts WHERE id = ?",
      [id]
    );
    return result.affectedRows; // Return the number of rows deleted
  } catch (error) {
    console.error("Database Delete Error (WhatsApp Contact):", error);
    throw error;
  }
};

module.exports = {
  createContactInDB,
  getAllContactsFromDB,
  deleteContactInDB,
  createWhatsappContactInDB,
  getAllWhatsappContactsFromDB,
  deleteWhatsappContactInDB,
  updateWhatsappContactInDB,
};
