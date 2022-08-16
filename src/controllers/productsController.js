const { findById } = require("../models/Product");
const Product = require("../models/Product");
const User = require("../models/User");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (error) {
    res.json({
      message: "Something went wrong, could not get all products",
      error: error.message,
    });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    res.json({
      message: "Something went wrong, could not get the specified product",
      error: error.message,
    });
  }
};

const addOneProduct = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, description, image_url, price } = req.body;
    const productAdded = await Product.create({
      name,
      description,
      image_url,
      price,
    });
    res
      .status(201)
      .json({ message: "Product succesfully created", productAdded });
  } catch (error) {
    res.json({
      message: "Something went wrong, could not create new product",
      error: error.message,
    });
  }
};

const updateOneProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({ message: "Product succesfully updated" });
  } catch (error) {
    res.json({
      message: "Something went wrong, could not update the specified product",
      error: error.message,
    });
  }
};

const deleteOneProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete({
      _id: req.params.id,
    });

    res.status(200).json({ message: "Product succesfully deleted" });
  } catch (error) {
    res.json({
      message: "Something went wrong, could not delete the specified product",
      error: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  addOneProduct,
  updateOneProduct,
  deleteOneProduct,
};
