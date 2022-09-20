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

const getAllSales = async () => { 
  const [result] = await connection.execute(
    `SELECT sale_id AS saleId, date, product_id AS productId, quantity 
     FROM StoreManager.sales AS s
     INNER JOIN StoreManager.sales_products AS sp
     ON s.id = sp.sale_id
     ORDER BY sp.sale_id, sp.product_id`,
  );
  return result;
};

const getSalesById = async (id) => { 
  const [result] = await connection.execute(
    `SELECT date, product_id AS productId, quantity 
     FROM StoreManager.sales AS s
     INNER JOIN StoreManager.sales_products AS sp
     ON s.id = sp.sale_id
     WHERE s.id = ?`, [id],
  );
  return result;
};
 
const deleteSale = async (id) => { 
  await connection.execute(
    `DELETE FROM StoreManager.sales
     WHERE id = ?`,
    [id],
  );
};
 
const updateSale = async (body, id) => { 
  const promises = body.map(async (b) => { 
    await connection.execute(
      `UPDATE StoreManager.sales_products
       SET quantity = ?
       WHERE sale_id = ? 
       AND product_id = ?`,
      [b.quantity, id, b.productId],
    );
    return b;
  });
  const promisesSolved = await Promise.all(promises);
  return {
    saleId: id,
    itemsUpdated: promisesSolved,
  };
};

module.exports = {
  registerSales,
  getAllSales,
  getSalesById,
  deleteSale,
  updateSale,
};