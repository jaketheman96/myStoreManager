const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const productsServices = require('../../../src/services/productsServices');
const productsController = require('../../../src/controllers/productsController');
const {
  products,
  productToInsert,
  productToUpdate
} = require('../mocks/productsMock');

describe('Testa a camada controller', function () {
  it('Verifica se a funcao getProducts da camada controller retorna todos os produtos', async function () {
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsServices, 'getProducts')
      .resolves(products);

    await productsController.getProducts(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(products);
  });

  it('Verifica se a funcao getProductsById retorna o produto referente ao id informado', async function () {
    const req = { params: { id: 1 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns()

    sinon.stub(productsServices, 'getProductsById')
      .resolves(products[0]);

    await productsController.getProductsById(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(products[0]);
  });

  it('Verifica se a funcao registerProducts cadastra o produto retornando o status e json corretamente', async function () {
    const mock = products.push(productToInsert);
    const req = { body: { productToInsert } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns()

    sinon.stub(productsServices, 'registerProduct')
      .resolves(mock);

    await productsController.registerProduct(req, res);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWith(mock);
  });

  it('Verifica se a function updateProduct atualiza as informacoes corretamente', async function () {
    const mock = products;
    mock[0] = { id: 1, name: productToUpdate.name };
    const req = { body: { productToUpdate }, params: { id: 1 } };
    const res = {};
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns()

    sinon.stub(productsServices, 'updateProduct')
      .resolves(mock[0]);

    await productsController.updateProduct(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(mock[0]);
  });

  it('Verifica se a function deleteProduct deleta o produto pelo id', async function () {
    const mock = products.filter((p) => p.id !== 3);
    const req = { params: { id: 3 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns()

    sinon.stub(productsServices, 'deleteProduct')
      .resolves(mock);

    await productsController.deleteProduct(req, res);

    expect(res.status).to.be.calledWith(204);
    expect(res.json).to.be.calledWith(null);
  })

  it('Verifica se a function searchByName localiza o produto pelo name', async function () {
    const req = { query: { q: 'Martelo' } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns()

    sinon.stub(productsServices, 'getByName')
      .resolves(products[0]);

    await productsController.getByName(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(products[0]);
  })

  afterEach(sinon.restore);

});