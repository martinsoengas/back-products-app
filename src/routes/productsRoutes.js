const express = require("express");
const routes = express.Router();

const { readAllProducts } = require("../controllers/productsController");

routes.get("/products", readAllProducts);

module.exports = routes;
