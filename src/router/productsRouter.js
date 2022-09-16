const express = require('express');
const productsController = require('../controllers/productsController');
const { validateProductName } = require('../middlewares/productNameValidation');

const router = express.Router();

router.get('/', productsController.getProducts);

router.get('/:id', productsController.getProductsById);

router.post('/', validateProductName, productsController.registerProduct);

module.exports = router;