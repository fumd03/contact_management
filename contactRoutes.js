const express = require("express");
const router = express.Router();
const contactModel = require("../models/contact");

// Display all contacts
router.get("/", async (req, res) => {
  const contacts = await contactModel.getContacts();
  res.render("index", { contacts });
});

// Show form to add a new contact
router.get("/add", (req, res) => {
  res.render("add");
});

// Handle adding a new contact
router.post("/add", async (req, res) => {
  const { name, phone_number, email } = req.body;
  await contactModel.addContact(name, phone_number, email);
  res.redirect("/");
});

// Show details of a contact
router.get("/contact/:id", async (req, res) => {
  const contact = await contactModel.getContactById(req.params.id);
  res.render("show", { contact });
});

// Show form to edit a contact
router.get("/edit/:id", async (req, res) => {
  const contact = await contactModel.getContactById(req.params.id);
  res.render("edit", { contact });
});

// Handle editing a contact
router.post("/edit/:id", async (req, res) => {
  const { name, phone_number, email } = req.body;
  await contactModel.updateContact(req.params.id, name, phone_number, email);
  res.redirect("/");
});

// Handle deleting a contact
router.post("/delete/:id", async (req, res) => {
  await contactModel.deleteContact(req.params.id);
  res.redirect("/");
});

module.exports = router;
