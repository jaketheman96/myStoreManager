const { expect } = require('chai');
const sinon = require('sinon');

const { connection } = require('../../../src/models/connection');
const productsModel = require('../../../src/models/productsModel');
const { products, productToUpdate } = require('../mocks/productsMock');

describe('Testa a camada model', function () {
  it('Verifica se a funcao getProducts retorna o resultado esperado', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const response = await productsModel.getProducts();
    expect(response).to.be.deep.equal(products);
  });

  it('Verifica se a funcao getProductsById retorna o produto correto com id informado', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]])
    const response = await productsModel.getProductsById(1);
    expect(response).to.be.deep.equal(products[0])
  });

  it('Verifica se a funcao registerProducts insere o produto corretamente', async function () {
    const obj = { id: 5, name: 'Xablau' }
    const allProducts = [...products];
    allProducts.push(obj);
    sinon.stub(connection, 'execute').resolves(allProducts)
    const response = await productsModel.registerProduct(obj);
    expect(response.name).to.be.deep.equal(obj);
  });

  it('Verifica se a funcao updateProduct atualiza o produto corretamente com o id informado', async function () {
    const allProducts = [...products];
    allProducts[0] = { id: 1, name: productToUpdate.name };
    sinon.stub(connection, 'execute').resolves(allProducts)
    const response = await productsModel.updateProduct(productToUpdate.name, 1);
    expect(response).to.be.deep.equal(allProducts[0])
  });

  it('Verifica se a funcao deleteProduct deleta o produto corretamente com o id informado', async function () {
    const id = 4;
    const allProducts = [...products];
    const deleted = allProducts.filter((p) => p.id !== id);
    sinon.stub(connection, 'execute').resolves(deleted)
    const response = await productsModel.deleteProduct(id);
    expect(response).to.be.deep.equal()
  });

  it('Verifica se a funcao getByName localiza o produto corretamente com a query informada', async function () {
    const name = 'Traje';
    const allProducts = [...products];
    const filtered = allProducts.filter((p) => p.name.includes(name));
    sinon.stub(connection, 'execute').resolves(filtered)
    const response = await productsModel.getByName(name);
    expect(response).to.be.deep.equal(filtered[0])
  });

  afterEach(sinon.restore);
})

