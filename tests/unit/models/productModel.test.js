const { expect } = require('chai');
const sinon = require('sinon');

const { connection } = require('../../../src/models/connection');
const productsModel = require('../../../src/models/productsModel');
const { products, productInserted } = require('../mocks/productsMock');

describe('Testa a camada model', function () {
  it('Verifica se a funcao getProducts retorna o resultado esperado', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const response = await productsModel.getProducts();
    expect(response).to.be.deep.equal(productsMock);
  });

  it('Verifica se a funcao getProductsById retorna o produto correto com id informado', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]])
    const response = await productsModel.getProductsById(1);
    expect(response).to.be.deep.equal(productsMock[0])
  });

  // it('Verifica se a funcao registerProducts insere o produto corretamente', async function () {
  //   // sinon.stub(connection, 'execute').resolves
  // });

  afterEach(sinon.restore);
})

