const { expect } = require('chai');
const sinon = require('sinon');

const { connection } = require('../../../src/models/connection');
const salesModel = require('../../../src/models/salesModel');
const {
  allSales,
  salesToInsert,
  salesInserted,
  salesUpdated
} = require('../mocks/salesMock');

describe('Teste na camada sales model', function () {
  
  it('Verifica se a function registerSales registra os dados corretamente', async function () { 
    const insertId = 3;
    sinon.stub(connection, 'execute').resolves([{ insertId }]);
    const response = await salesModel.registerSales(salesToInsert);
    expect(response).to.be.deep.equal(salesInserted);
  });
  
  it('Verifica se a function getAllSales retorna os dados corretamente', async function () {
    sinon.stub(connection, 'execute').resolves(allSales);
    const response = await salesModel.getAllSales();
    expect(response).to.be.deep.equal(allSales[0]);
  });

  it('Verifica se a function getSalesById retorna os dados corretamente', async function () {
    const id = 1;
    const filtering = allSales.filter((s) => s.id === id)
    sinon.stub(connection, 'execute').resolves(filtering);
    const response = await salesModel.getSalesById(id);
    expect(response).to.be.deep.equal(filtering);
  });
  
  afterEach(sinon.restore);
 });