const { connection } = require('./connection');

const getProducts = async () => { 
  const query = 'SELECT * FROM StoreManager.products';
  const [result] = await connection.execute(query);
  return result;
};
 
const getProductsById = async (id) => { 
  const query = `SELECT * FROM StoreManager.products WHERE id = ${id}`;
  const [[result]] = await connection.execute(query);
  return result;
 };

 // erro esta aqui, verificar sintaxe da query ao se conectar com o banco de dados.
const registerProduct = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES(?)';
  const [result] = await connection.execute(query, [name]);
  return { id: result.insertId, name };
 };

module.exports = {
  getProducts,
  getProductsById,
  registerProduct,
};