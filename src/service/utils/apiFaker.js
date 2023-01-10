const {faker} = require("@faker-js/faker")
faker.locale = "es"

function generarProductos (){
    return {
        nombre: faker.name.jobDescriptor(),
        precio: faker.finance.creditCardNumber(),
        foto: faker.image.avatar()
    }
}

const apiProductos = (cantidada) =>{
    const api = [];
    for(let i = 0 ; i < cantidada; i++){
        let newProduct = generarProductos();
        api.push(newProduct)
    }
    return api;
}

module.exports = apiProductos