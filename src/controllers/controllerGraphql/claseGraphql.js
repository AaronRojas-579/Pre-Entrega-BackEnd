
class Producto {
    constructor(id,{nombre,precio}){
        this.id = id,
        this.nombre = nombre,
        this.precio = precio
    }
}

//Funciones de Persistencia
const crypto = require("crypto")

const productosMap = {};

function getProductos({ campo, valor }) {
    const personas = Object.values(productosMap)
    if (campo && valor) {
        return personas.filter(p => p[ campo ] == valor);
    } else {
        return personas;
    }
}

function getProducto({ id }) {
    if (!productosMap[ id ]) {
        throw new Error('Producto not found.');
    }
    return productosMap[ id ];
}

function createProducto({ datos }) {
    const id = crypto.randomBytes(10).toString('hex');
    const nuevaPersona = new Producto(id, datos)
    productosMap[ id ] = nuevaPersona;
    return nuevaPersona;
}

function updateProducto({ id, datos }) {
    if (!productosMap[ id ]) {
        throw new Error('Producto not found');
    }
    const personaActualizada = new Producto(id, datos)
    productosMap[ id ] = personaActualizada;
    return personaActualizada;
}

function deleteProducto({ id }) {
    if (!productosMap[ id ]) {
        throw new Error('Producto not found');
    }
    const personaBorrada = productosMap[ id ]
    delete productosMap[ id ];
    return personaBorrada;
}


module.exports={
    getProducto,
    getProductos,
    createProducto,
    updateProducto,
    deleteProducto,
    Producto
}