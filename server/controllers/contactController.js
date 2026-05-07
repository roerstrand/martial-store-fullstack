// CONTROLLER tar emot och returnerar HTTP requests och responses
// VARJE FUNKTION har desc, route, access = Dokumentation
// VARJE FUNKTION = en route handler

const asyncHandler = require("express-async-handler"); // MIddleware för async hantering => ingen try/catch
const Contact = require("../models/contactModel");

// @desc GET all contacts
// @route GET /api/contacts
// @access Public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

// @desc POST new contact
// @route POST /api/contacts
// @access Public
const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Alla fält måste fyllas i" });
    }

    const contact = await Contact.create({ name, email, phone });

    res.status(201).json(contact);
  } catch (error) {
    console.log(error.message);
  }
};

// @desc PUT edit contact
// @route PUT /api/:id
// @access Public
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.status(200).json(contact);
});

// @desc GET one contact
// @route GET /api/:id
// @access Public
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json({ message: `Get contact with id ${req.params.id}` });
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.status(200).json({ message: "Contact deleted", data: contact });
});

module.exports = {
  getContacts,
  createContact,
  updateContact,
  getContact,
  deleteContact,
};
