const Product = require('../models/Product');

// Ürünleri kategoriye göre listeleyen fonksiyon
const getProducts = async (req, res) => {
  try {
    const { category } = req.params; // Kategoriyi URL parametresinden alıyoruz
    const products = await Product.find({ category }); // Kategoriye göre ürünleri buluyoruz
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Belirli bir ürünü ID'sine göre getiren fonksiyon
const getProductById = async (req, res) => {
  try {
    const { id } = req.params; // Ürün ID'sini URL parametresinden alıyoruz
    const product = await Product.findById(id); // ID'ye göre ürünü buluyoruz

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Yeni ürün ekleme fonksiyonu
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file.path; // Multer dosya yolunu buraya ekliyor

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

// Belirli bir ürünü silen fonksiyon
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // Ürün ID'sini URL parametresinden alıyoruz
    const deletedProduct = await Product.findByIdAndDelete(id); // Ürünü sil

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Belirli bir ürünü güncelleyen fonksiyon
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // Ürün ID'sini URL parametresinden alıyoruz
    const updates = req.body; // Güncellenmesi gereken veriler

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true }); // Ürünü güncelle

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};
