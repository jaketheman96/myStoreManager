const { expect } = require('chai');
const sinon = require('sinon');

const productsServices = require('../../../src/services/productsServices');
const productsController = require('../../../src/controllers/productsController');
const productsMock = require('../mocks/productsMock');

describe('Testa a camada controller', function () {
  it('Verifica se a funcao getProducts da camada controller retorna todos os produtos', async function () {
    sinon.stub(productsServices, 'getProducts')
      .resolves([productsMock]);
    const req = { params: {}, body: {}};
    const res = {};

    res.status = sinon.stub().returns(200);
    res.json = sinon.stub().returns()

    await productsController.getProducts(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(productsMock);
  });

  it('Verifica se a funcao getProductsById retorna o produto referente ao id informado', async function () {
    sinon.stub(productsServices, 'getProducts')
      .resolves(productsMock[0]);
    const req = { params:{ id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(200);
    res.json = sinon.stub().returns()

    await productsController.getProductsById(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(productsMock[0]);
  });
  afterEach(sinon.restore);

});