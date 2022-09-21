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
  try {
    const { name } = req.body;
    const responseFromService = await productsServices.registerProduct(name);
    return res.status(201).json(responseFromService);
  } catch (error) {
    return error;
  }
};

const updateProduct = async (req, res) => {
  try {
    const { body: { name }, params: { id } } = req;
    const response = await productsServices.updateProduct(name, id);
    return res.status(200).json(response);
  } catch (error) {
    return error;
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productsServices.deleteProduct(id);
    return res.status(204).json(null);
  } catch (error) {
    return error;
  }
};

const getByName = async (req, res) => { 
  try {
    const { q } = req.query;
    const response = await productsServices.getByName(q);
    return res.status(200).json(response);
  } catch (error) {
    return error;
  }
};

module.exports = {
  getProducts,
  getProductsById,
  registerProduct,
  updateProduct,
  deleteProduct,
  getByName,
};