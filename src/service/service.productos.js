const MongoAtlas = require("../../daos/dataBaseMongo")
const modelProductos = require("../../daos/models/productos.model")

const productos = new MongoAtlas(modelProductos)

module.exports = productos