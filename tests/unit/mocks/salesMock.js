const allSales = [
  {
    "saleId": 1,
    "date": "2022-09-22T20:02:16.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 2,
    "date": "2022-09-22T20:02:16.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 3,
    "date": "2022-09-22T20:02:16.000Z",
    "productId": 3,
    "quantity": 15
  }
]

const salesToInsert = [
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 50
  }
]

const salesInserted = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 10
    },
    {
      "productId": 2,
      "quantity": 50
    }
  ]
}

const salesUpdated = {
  "saleId": "1",
  "itemsUpdated": [
    {
      "productId": 1,
      "quantity": 10
    },
    {
      "productId": 2,
      "quantity": 50
    }
  ]
}

module.exports = {
  allSales,
  salesToInsert,
  salesInserted,
  salesUpdated
}