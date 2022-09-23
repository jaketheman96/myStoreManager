const { expect } = require('chai');
const sinon = require('sinon');

const salesServices = require('../../../src/services/salesServices');
const salesModel = require('../../../src/models/salesModel');
const {
  allSales,
  salesToInsert,
  salesInserted,
  salesUpdated
} = require('../mocks/salesMock');

describe('Testes na camada sales services', function () {

  it('Verifica se a function registerSales registra os dados corretamente', async function () {
    sinon.stub(salesModel, 'registerSales').resolves(salesInserted);
    const response = await salesServices.registerSales(salesToInsert);
    expect(response).to.be.deep.equal(salesInserted);
  });

  it('Verifica se a function getAllSales registra os dados corretamente', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(allSales);
    const response = await salesServices.getAllSales();
    expect(response).to.be.deep.equal(allSales);
  });

  it('Verifica se a function getSalesById registra os dados corretamente', async function () {
    const id = 1;
    const filterSales = allSales.filter((s) => s.id === id);
    sinon.stub(salesModel, 'getSalesById').resolves(filterSales);
    const response = await salesServices.getSalesById(id);
    expect(response).to.be.deep.equal(filterSales);
  });

  it('Verifica se a function deleteSale registra os dados corretamente', async function () {
    const id = 1;
    const filterSales = allSales.filter((s) => s.id !== id);
    sinon.stub(salesModel, 'deleteSale').resolves(filterSales);
    const response = await salesServices.deleteSale();
    expect(response).to.be.deep.equal();
  });

  it('Verifica se a function updateSale registra os dados corretamente', async function () {
    const id = 1;
    const salesToUpdate = salesInserted;
    sinon.stub(salesModel, 'updateSale').resolves(salesUpdated);
    const response = await salesServices.updateSale(salesToUpdate, id);
    expect(response).to.be.deep.equal(salesUpdated);
  });

  afterEach(sinon.restore);
});