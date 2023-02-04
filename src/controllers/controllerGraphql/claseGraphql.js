
const productos = require("../../service/service.productos")

// class Producto {
//     constructor(id,{nombre,precio}){
//         this.id = id,
//         this.nombre = nombre,
//         this.precio = precio
//     }
// }

//Funciones de Persistencia
// const crypto = require("crypto")

// const productosMap = {};

async function getProductos() {
    return await productos.getAll()
}

async function getProducto({ id }) {
    return (await productos.getById(id))[0]
}

async function createProducto({ datos }) {
    await productos.save(datos);
    const allProductos = await productos.getAll();
    return allProductos[allProductos.length - 1]
}

async function updateProducto({ id, datos }) {
    await productos.updateById(id,datos)
    return (await productos.getById(id))[0]
}

async function deleteProducto({ id }) {
    const prodctoEliminar = (await productos.getById(id))[0];
    await productos.deleteById(id)
    return prodctoEliminar;
}



module.exports={
    getProducto,
    getProductos,
    createProducto,
    updateProducto,
    deleteProducto,
}