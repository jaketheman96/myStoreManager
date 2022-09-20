const productsModel = require('../models/productsModel');
const { salesSchema } = require('./salesSchema');
const { getSalesById } = require('../models/salesModel');

const salesValidation = async (req, res, next) => {
  const validation = salesSchema.validate(req.body);
  if (!validation.error) return next();
  const { details: [{ message }] } = validation.error;
  if (message === '"productId" is required') return res.status(400).json({ message });
  if (message === '"quantity" is required') return res.status(400).json({ message });
  if (message.includes('greater than')) return res.status(422).json({ message });
};

const notFoundValidation = async (req, res, next) => {
  const { getProductsById } = productsModel;
  const arrayOfIds = req.body.map(({ productId }) => productId);
  const checkIds = arrayOfIds.map((id) => getProductsById(id));
  const products = await Promise.all(checkIds);
  if (products.some((p) => !p)) return res.status(404).json({ message: 'Product not found' });
  return next();
};

const salesIdValidation = async (req, res, next) => { 
  const { id } = req.params;
  const response = await getSalesById(id);
  if (!response.length) return res.status(404).json({ message: 'Sale not found' });
  return next();
};

module.exports = {
  salesValidation,
  notFoundValidation,
  salesIdValidation,
};
