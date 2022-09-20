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

module.exports = {
  registerSales,
  getAllSales,
  getSalesById,
  deleteSale,
};