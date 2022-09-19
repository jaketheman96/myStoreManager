const salesModel = require('../models/salesModel');

const registerSales = async (products) => { 
  const responseFromModel = await salesModel.registerSales(products);
  return responseFromModel;
 };

module.exports = { registerSales };