const express = require('express');
const salesController = require('../controllers/salesController');
const {
  salesValidation,
  notFoundValidation,
  salesIdValidation,
} = require('../middlewares/salesValidation');

const router = express.Router();

router.post('/', salesValidation, notFoundValidation, salesController.registerSales);

router.get('/:id', salesIdValidation, salesController.getSalesById);

router.get('/', salesController.getAllSales);

router.delete('/:id', salesIdValidation, salesController.deleteSale);

router.put('/:id',
  salesValidation,
  notFoundValidation,
  salesIdValidation,
  salesController.updateSale);

module.exports = router;