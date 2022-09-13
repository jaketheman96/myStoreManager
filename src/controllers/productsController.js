const productsService = require('../services/productsService');

const getProducts = async (_req, res, next) => { 
  try {
    const responseFromService = await productsService.getProducts();
    return res.status(200).json(responseFromService);
  } catch (error) {
    next(error);
  }
 };

const getProductsById = async (req, res, next) => { 
  const { id } = req.params;
  try {
    const responseFromService = await productsService.getProductsById(id);
    if (!responseFromService) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(responseFromService);
  } catch (error) {
    next(error);
  }
 };

module.exports = { getProducts, getProductsById };