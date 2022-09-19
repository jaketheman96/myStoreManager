const express = require('express');
const salesController = require('../controllers/salesController');
const { salesValidation, notFoundValidation } = require('../middlewares/salesValidation');

const router = express.Router();

router.post('/', salesValidation, notFoundValidation, salesController.registerSales);

module.exports = router;