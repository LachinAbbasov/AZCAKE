const express = require('express');
const router = express.Router();
const { getProducts, createProduct, getProductById, deleteProduct, updateProduct } = require('../controllers/productController');


router.get('/:category', getProducts);


router.get('/product/:id', getProductById);


router.post('/', createProduct);


router.delete('/product/:id', deleteProduct);


router.put('/product/:id', updateProduct);

module.exports = router;
