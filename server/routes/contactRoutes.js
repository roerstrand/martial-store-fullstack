const express = require("express");
const router = express.Router();
const {getContacts, createContact, updateContact, getContact, deleteContact } = require("../controllers/contactController")

// HÄR definierar vi ROUTES och vilken METOD ENDAST

// Definiera routes
// GET  /api/contacts
// POST /api/contacts
router.route("/").get(getContacts).post(createContact);

// PUT :id
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);


// router.route("/:id").get((req, res) => {
//         res.status(200).json({message: "Hämtar endast en kontakt"});

// });

// // PUT :id
// router.route("/:id").put((req, res) => {
//         res.status(200).json({message: "Ändrar en kontakt"});

// });

// // // DETELE :id
// router.route("/:id").delete((req, res) => {
//         res.status(200).json({message: "Tar bort en kontakt"});

// });

module.exports = router;