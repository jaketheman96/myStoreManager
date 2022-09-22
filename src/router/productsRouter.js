const express = require('express');
const productsController = require('../controllers/productsController');
const {
  validateProductName,
  productIdValidation,
} = require('../middlewares/productValidation');

const router = express.Router();

router.get('/', productsController.getProducts);

router.get('/search', productsController.getByName);

router.get('/:id', productIdValidation, productsController.getProductsById);

router.post('/', validateProductName, productsController.registerProduct);

router.put('/:id', validateProductName, productIdValidation, productsController.updateProduct);

router.delete('/:id', productIdValidation, productsController.deleteProduct);

module.exports = router;