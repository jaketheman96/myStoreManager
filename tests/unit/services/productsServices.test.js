const { expect } = require('chai');
const sinon = require('sinon');

const productsServices = require('../../../src/services/productsServices');
const productsModel = require('../../../src/models/productsModel');
const { products, productToInsert, productToUpdate } = require('../mocks/productsMock');

describe('Testa a camada Product Services', function () {
  it('Verifica se a funcao getProducts retorna o resultado esperado', async function () {
    sinon.stub(productsModel, 'getProducts').resolves(products);
    const response = await productsServices.getProducts();
    expect(response).to.be.deep.equal(products);
  });

  it('Verifica se a funcao getProductsById retorna o produto correto com id informado', async function () {
    sinon.stub(productsModel, 'getProductsById').resolves(products[0])
    const response = await productsServices.getProductsById(1);
    expect(response).to.be.deep.equal(products[0])
  });

  it('Verifica se a funcao registerProduct registra o produto corretamente', async function () {
    const arrayOfProducts = [...products];
    const insertObject = arrayOfProducts.push(productToInsert);
    sinon.stub(productsModel, 'registerProduct').resolves(insertObject)
    const response = await productsServices.registerProduct(productToInsert.name);
    expect(response).to.be.deep.equal(insertObject)
  });

  it('Verifica se a funcao updateProduct atualiza o produto corretamente', async function () {
    const arrayOfProducts = [...products];
    arrayOfProducts[0] = { id: 1, name: productToUpdate.name };
    sinon.stub(productsModel, 'updateProduct').resolves(arrayOfProducts)
    const response = await productsServices.updateProduct(productToUpdate.name);
    expect(response).to.be.deep.equal(arrayOfProducts)
  });

  it('Verifica se a funcao deleteProduct deleta o produto corretamente', async function () {
    const id = 4;
    const deletedObject = products.filter((p) => p.id !== id);
    sinon.stub(productsModel, 'deleteProduct').resolves(deletedObject)
    const response = await productsServices.deleteProduct(id);
    expect(response).to.be.deep.equal()
  });

  it('Verifica se a funcao getByName retorna o produto corretamente com nome valido', async function () {
    const name = 'Traje';
    const searching = products.filter((p) => p.name.includes(name));
    sinon.stub(productsModel, 'getByName').resolves(searching)
    sinon.stub(productsModel, 'getProducts').resolves(products);
    const response = await productsServices.getByName(name);
    expect(response).to.be.deep.equal(searching)
  });

  it('Verifica se a funcao getByName retorna todos os produtos quando o nome é inválido', async function () {
    const name = 'Xablau';
    const searching = products.filter((p) => p.name.includes(name));
    sinon.stub(productsModel, 'getByName').resolves(searching)
    sinon.stub(productsModel, 'getProducts').resolves(products);
    const response = await productsServices.getByName('Xablau');
    expect(response).to.be.deep.equal(products);
  });

  afterEach(sinon.restore);
})