require("./src/config/database");
require("dotenv").config();

const cors = require("cors");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;
const productsRoutes = require("./src/routes/productsRoutes");
const userRoutes = require("./src/routes/userRoutes");

app.use(cors());

app.use(express.json());

app.use("/", productsRoutes);
app.use("/", userRoutes);

app.listen(PORT, () => console.log("Server running on port:", PORT));
