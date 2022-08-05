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

app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), () =>
  console.log("Server running on port:", app.get("port"))
);
