const Product = require('../models/Product');

const getProducts = (category) => async (req, res) => {
  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file.path;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProducts,
  createProduct,
};
