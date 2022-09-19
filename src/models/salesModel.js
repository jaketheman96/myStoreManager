const { connection } = require('./connection');

const registerSales = async (products) => { 
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ()',
  );
  const arrayOfProducts = products.map(async (p) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [insertId, p.productId, p.quantity],
    );
    return p;
  });
  const solving = await Promise.all(arrayOfProducts);
  return {
    id: insertId,
    itemsSold: solving,
  };
};

module.exports = { registerSales };