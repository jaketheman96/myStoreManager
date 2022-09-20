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

const registerProduct = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES(?)';
  const [result] = await connection.execute(query, [name]);
  return { id: result.insertId, name };
};
 
const updateProduct = async (info, id) => { 
  Promise.all(await connection.execute(
    `UPDATE StoreManager.products
     SET name = ?
     WHERE id = ?`,
     [info, id],
  ));
  return {
    id,
    name: info,
  };
};

module.exports = {
  getProducts,
  getProductsById,
  registerProduct,
  updateProduct,
};