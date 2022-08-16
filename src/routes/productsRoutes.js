const express = require("express");
const routes = express.Router();
const authenticateToken = require("../middleware/auth");

const {
  getAllProducts,
  getOneProduct,
  addOneProduct,
  updateOneProduct,
  deleteOneProduct,
} = require("../controllers/productsController");

routes.get("/", (req, res) => res.json({ status: "online" }));

routes.get("/products", getAllProducts);

routes.get("/product/:id", getOneProduct);

routes.post("/new-product", authenticateToken, addOneProduct);

routes.patch("/product/:id", authenticateToken, updateOneProduct);

routes.delete("/product/:id", authenticateToken, deleteOneProduct);

module.exports = routes;
