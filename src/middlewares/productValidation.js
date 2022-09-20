const { getProductsById } = require('../models/productsModel');

const validateProductName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  return next();
};

const productIdValidation = async (req, res, next) => {
  const { id } = req.params;
  const getId = await getProductsById(id);
  if (!getId) return res.status(404).json({ message: 'Product not found' });
  return next();
};

module.exports = { validateProductName, productIdValidation };