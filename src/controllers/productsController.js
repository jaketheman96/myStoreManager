const productsServices = require('../services/productsServices');

const getProducts = async (_req, res) => {
  const responseFromService = await productsServices.getProducts();
  return res.status(200).json(responseFromService);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const responseFromService = await productsServices.getProductsById(id);
  return res.status(200).json(responseFromService);
};

const registerProduct = async (req, res) => {
  const { name } = req.body;
  const responseFromService = await productsServices.registerProduct(name);
  return res.status(201).json(responseFromService);
};

const updateProduct = async (req, res) => {
  const { body: { name }, params: { id } } = req;
  const response = await productsServices.updateProduct(name, id);
  return res.status(200).json(response);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await productsServices.deleteProduct(id);
  return res.status(204).json(null);
};

const getByName = async (req, res) => {
  const { q } = req.query;
  const response = await productsServices.getByName(q);
  return res.status(200).json(response);
};

module.exports = {
  getProducts,
  getProductsById,
  registerProduct,
  updateProduct,
  deleteProduct,
  getByName,
};