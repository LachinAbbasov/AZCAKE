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

router.get('/paste', getProducts('paste'));
router.get('/crema', getProducts('crema'));
router.get('/paxlava', getProducts('paxlava'));
router.get('/mayalilar', getProducts('mayalilar'));
router.get('/deserts', getProducts('deserts'));
router.post('/', authMiddleware, upload.single('image'), createProduct);

module.exports = router;
