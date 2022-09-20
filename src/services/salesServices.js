const salesModel = require('../models/salesModel');

const registerSales = async (products) => { 
  const responseFromModel = await salesModel.registerSales(products);
  return responseFromModel;
 };

const getAllSales = async () => { 
  const response = await salesModel.getAllSales();
  return response;
 };

const getSalesById = async (id) => {
  const response = await salesModel.getSalesById(id);
  return response;
};

const deleteSale = async (id) => { 
  await salesModel.deleteSale(id);
};
 
const updateSale = async (body, id) => { 
  const response = await salesModel.updateSale(body, id);
  return response;
 };

module.exports = {
  registerSales,
  getAllSales,
  getSalesById,
  deleteSale,
  updateSale,
};