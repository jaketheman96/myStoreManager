const express = require('express');
const productsRouter = require('./router/productsRouter');
const salesRouter = require('./router/salesRouter');

const app = express();
app.use(express.json());
app.use('/products', productsRouter);
app.use('/sales', salesRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use((error, _req, res, _next) => {
  if (error.status) return res.status(error.status).json({ message: error.message });
  return res.status(500).json({ message: error.message });
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo server.js para executar sua aplicação 
module.exports = app;