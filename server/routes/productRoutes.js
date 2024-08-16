const express = require('express');
const router = express.Router();
const { getProducts, createProduct } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get('/:category', getProducts);

router.post('/', authMiddleware, upload.single('image'), createProduct);

module.exports = router;
