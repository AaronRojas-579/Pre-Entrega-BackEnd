const {buildSchema  } = require("graphql")

const schema = buildSchema(`
input productosInput {
    nombre: String,
    calidad: String,
    precio: Int
  }
  type Productos {
    id: ID!
    nombre: String,
    calidad: String,
    precio: Int
  }
  type Query {
    getProducto(id: ID!): Productos,
    getProductos(campo: String, valor: String): [Productos],
  }
  type Mutation {
    createProducto(datos: productosInput): Productos
    updateProducto(id: ID!, datos: productosInput): Productos,
    deleteProducto(id: ID!): Productos,
  } 
`)

module.exports = schema