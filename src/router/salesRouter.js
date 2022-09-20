const express = require('express');
const salesController = require('../controllers/salesController');
const {
  salesValidation,
  notFoundValidation,
  getSalesValidation,
} = require('../middlewares/salesValidation');

const router = express.Router();

router.post('/', salesValidation, notFoundValidation, salesController.registerSales);

router.get('/:id', getSalesValidation, salesController.getSalesById);

router.get('/', salesController.getAllSales);

module.exports = router;