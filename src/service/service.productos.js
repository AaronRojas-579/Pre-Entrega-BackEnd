// const MongoAtlas = require("../../daos/dataBaseMongo")
const daos = require("../../daos/factory")
const modelProductos = require("../../daos/models/productos.model")
const carritoDTO = require("../repo/carrito.dto")

const {loggerConsola,loggerWarn,loggerError} = require("./utils/loggers")


class ProductosDB extends daos{
    constructor(model){
        super(model)
    }
    async CarritoDTO(id,cantidad) {
        try{
            const productoABuscar = (await this.getById(id))[0]
            const carrito = new carritoDTO(productoABuscar,cantidad)
            return carrito

        }catch(err){
            loggerWarn.warn(err)
        }
    }

}

const productos = new ProductosDB(modelProductos)

module.exports = productos