const productsModel = require('../models/productsModel');

const getProducts = async () => { 
  const responseFromModel = await productsModel.getProducts();
  return responseFromModel;
};

const getProductsById = async (id) => { 
  const responseFromModel = await productsModel.getProductsById(id);
  return responseFromModel;
 };

const registerProduct = async (name) => {
  const responseFromModel = await productsModel.registerProduct(name);
  return responseFromModel;
 };

module.exports = {
  getProducts,
  getProductsById,
  registerProduct,
};