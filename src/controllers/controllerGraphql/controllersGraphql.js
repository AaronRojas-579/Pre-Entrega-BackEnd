const {graphqlHTTP} = require("express-graphql")
const productosSchema = require("./schemas/productosSchema")
// const schemaPersona = require("./schemas/personasSchema")

//Clase de DAOS
const productos = require("../../service/service.productos")

const {
    getProducto,
    getProductos,
    createProducto,
    updateProducto,
    deleteProducto,
} = require("./claseGraphql")

class graphqlController {
    constructor(){
        this.api = productos,
        this.config = {
            schema : productosSchema,
            rootValue :{
                getProducto,
                getProductos,
                createProducto,
                updateProducto,
                deleteProducto,
            },
            graphiql:true
        }
        return graphqlHTTP(this.config)
    }
}

module.exports = graphqlController