require("./src/config/database");
require("dotenv").config();

const cors = require("cors");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;
const routes = require("./src/routes/productsRoutes");

app.use(cors());

app.use(express.json());

app.use("/", routes);

app.listen(PORT, () => console.log("Server running on port:", PORT));
