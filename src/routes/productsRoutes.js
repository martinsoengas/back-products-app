const express = require("express");
const routes = express.Router();

const {
  getAllProducts,
  getOneProduct,
  addOneProduct,
  updateOneProduct,
  deleteOneProduct,
  login,
} = require("../controllers/productsController");

routes.get("/", (req, res) => res.json({ status: "online" }));

routes.get("/products", getAllProducts);

routes.get("/product/:id", getOneProduct);

routes.post("/new-product", addOneProduct);

routes.patch("/product/:id", updateOneProduct);

routes.delete("/product/:id", deleteOneProduct);

routes.post("/login", login);

module.exports = routes;
