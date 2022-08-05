const express = require("express");
const routes = express.Router();

const {
  getAllProducts,
  getOneProduct,
  addOneProduct,
  updateOneProduct,
  deleteOneProduct,
} = require("../controllers/productsController");

routes.get("/products", getAllProducts);

routes.get("/product/:id", getOneProduct);

routes.post("/new-product", addOneProduct);

routes.patch("/product/:id", updateOneProduct);

routes.delete("/product/:id", deleteOneProduct);

module.exports = routes;
