const salesServices = require('../services/salesServices');

const registerSales = async (req, res) => { 
  const { body } = req;
  const responseFromService = await salesServices.registerSales(body);
  return res.status(201).json(responseFromService);
};

module.exports = { registerSales };