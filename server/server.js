const express = require("express");
const dotenv = require("dotenv").config();
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/dbConnection");
const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();

const app = express();

app.use(express.json()); // middleware så express kan läsa json

app.use("/api/products", productRoutes);

app.use(errorHandler);

//Test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Martial store api running" });
});

const PORT = process.env.PORT || 3000;

//Starta serverm
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
