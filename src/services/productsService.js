const productsModel = require('../model/producstModel');

const getProducts = async () => { 
  const responseFromModel = await productsModel.getProducts();
  return responseFromModel;
};

const getProductsById = async (id) => { 
  const responseFromModel = await productsModel.getProductsById(id);
  return responseFromModel;
 };

module.exports = { getProducts, getProductsById };