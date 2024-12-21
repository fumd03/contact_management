const pool = require("../config/db");

// Get all contacts
const getContacts = async () => {
  const result = await pool.query("SELECT * FROM contacts");
  return result.rows;
};

// Get contact by ID
// Returns the first (and only) contact with the matching id.
const getContactById = async (id) => {
  const result = await pool.query("SELECT * FROM contacts WHERE id = $1", [id]);
  return result.rows[0];
};

// Add a new contact
// Returns the newly inserted contact row
const addContact = async (name, phone_number, email) => {
  const result = await pool.query(
    "INSERT INTO contacts (name, phone_number, email) VALUES ($1, $2, $3) RETURNING *",
    [name, phone_number, email]
  );
  return result.rows[0];
};

// Update contact by ID
// Returns the updated contact row
const updateContact = async (id, name, phone_number, email) => {
  const result = await pool.query(
    "UPDATE contacts SET name = $1, phone_number = $2, email = $3 WHERE id = $4 RETURNING *",
    [name, phone_number, email, id]
  );
  return result.rows[0];
};

// Delete contact by ID
const deleteContact = async (id) => {
  const result = await pool.query("DELETE FROM contacts WHERE id = $1", [id]);
  return result.rowCount > 0;
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
};
