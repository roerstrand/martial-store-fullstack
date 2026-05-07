// Express - Webbramverk för att bygga backend server (ROUTES)
// dotenv - läsa vad som står i .env-filen
// Nodemon - startar om servern när du ändrar koden (dev only)

const express = require('express');
const dotenv = require('dotenv').config();
const contactRoutes = require("./routes/contactRoutes");
const {connect} = require("mongoose");
const connectDB = require("./config/dbConnection");

connectDB();

const app = express();

// GET route för test
// localhost:3000/api/contacts
// app.get("/api/contacts", (req, res) => {
//     res.status(200).json({message: "Hej från min första server"});
// });
app.use(express.json()); // Middleware som kan hantera json object
app.use("/api/contacts", contactRoutes);

// STARTA servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servern är igång");
});

