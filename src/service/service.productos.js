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
    //Funciones para usarlos con el Graphql
    async getProductos (){
        const allProductos = await this.getAll();
        return allProductos;
    }
    async getProducto ({id}){
        return (await this.getById(id))[0]
    }
    async createProducto({datos}){
        await this.save(datos);
        const allProductos = await this.getAll();
        return allProductos[allProductos.length - 1]
    }
    async updateProducto({id,datos}){
        await this.updateById(id,datos)
        return await this.getById(id)
    }
    async deleteProducto({id}){
        const prodctoEliminar = await this.getById(id);
        await this.deleteById(id)
        return prodctoEliminar;
    }

}

const productos = new ProductosDB(modelProductos)

module.exports = productos