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
 
const updateProduct = async (info, id) => { 
  const response = await productsModel.updateProduct(info, id);
  return response;
};

const deleteProduct = async (id) => {
  await productsModel.deleteProduct(id);
 };

const getByName = async (q) => { 
  const response = await productsModel.getByName(q);
  if (response.length) return response;
  const allProducts = await productsModel.getProducts();
  return allProducts;
 };

module.exports = {
  getProducts,
  getProductsById,
  registerProduct,
  updateProduct,
  deleteProduct,
  getByName,
};