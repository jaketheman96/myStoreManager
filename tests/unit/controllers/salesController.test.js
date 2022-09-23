const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const salesServices = require('../../../src/services/salesServices');
const salesController = require('../../../src/controllers/salesController');
const {
  allSales,
  salesToInsert,
  salesInserted,
  salesUpdated
} = require('../mocks/salesMock');

describe('Testes na camada sales controller', function () {

  it('Verifica se a function registerSales registra os dados corretamente', async function () {
    const req = { body: { salesToInsert } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesServices, 'registerSales')
      .resolves(salesInserted);

    await salesController.registerSales(req, res);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWith(salesInserted);

  });

  it('Verifica se a function getAllSales retorna os dados corretamente', async function () {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesServices, 'getAllSales')
      .resolves(allSales);

    await salesController.getAllSales(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(allSales);

  });

  it('Verifica se a function getSalesById retorna os dados corretamente', async function () {
    const filterSale = allSales.filter((s) => s.id === 1);
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesServices, 'getSalesById')
      .resolves(filterSale);

    await salesController.getSalesById(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(filterSale);

  });

  it('Verifica se a function deleteSale retorna os dados corretamente', async function () {
    const deletingSale = allSales.filter((s) => s.id !== 1);
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesServices, 'deleteSale')
      .resolves(deletingSale);

    await salesController.deleteSale(req, res);

    expect(res.status).to.be.calledWith(204);
    expect(res.json).to.be.calledWith();

  });

  it('Verifica se a function updateSale retorna os dados corretamente', async function () {
    const salesToUpdate = salesToInsert;
    const req = { body: { salesToUpdate }, params: { id: 1} };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesServices, 'updateSale')
      .resolves(salesUpdated);

    await salesController.updateSale(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(salesUpdated);

  });

  afterEach(sinon.restore);
});