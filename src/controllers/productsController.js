const Product = require("../models/Product");

const readAllProducts = (req, res) => {
  Product.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }

    res.status(200).send(result);
  });
};

module.exports = { readAllProducts };
