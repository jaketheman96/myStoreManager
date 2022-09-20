const salesServices = require('../services/salesServices');

const registerSales = async (req, res) => { 
  const { body } = req;
  const responseFromService = await salesServices.registerSales(body);
  return res.status(201).json(responseFromService);
};

const getAllSales = async (_req, res) => { 
  const response = await salesServices.getAllSales();
  return res.status(200).json(response);
};
 
const getSalesById = async (req, res) => {
  const { id } = req.params;
  const response = await salesServices.getSalesById(id);
  return res.status(200).json(response);
 };

const deleteSale = async (req, res) => { 
  const { id } = req.params;
  await salesServices.deleteSale(id);
  return res.status(204).json(null);
 };

const updateSale = async (req, res) => { 
  const { body, params: { id } } = req;
  const response = await salesServices.updateSale(body, id);
  return res.status(200).json(response);
 };

module.exports = {
  registerSales,
  getAllSales,
  getSalesById,
  deleteSale,
  updateSale,
};