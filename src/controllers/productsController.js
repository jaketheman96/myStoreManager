const productsServices = require('../services/productsServices');

const getProducts = async (_req, res) => {
  const responseFromService = await productsServices.getProducts();
  return res.status(200).json(responseFromService);
};

const getProductsById = async (req, res) => { 
  const { id } = req.params;
    const responseFromService = await productsServices.getProductsById(id);
    if (!responseFromService) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(responseFromService);
 };

const registerProduct = async (req, res) => { 
  const { name } = req.body;
  const responseFromService = await productsServices.registerProduct(name);
  return res.status(201).json(responseFromService);
};

module.exports = {
  getProducts,
  getProductsById,
  registerProduct,
};