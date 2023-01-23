class carritoDTO {
    constructor(carrito,cantidad){
        this.nombre = carrito.nombre
        this.precio = carrito.precio
        this.cantidad = cantidad
        this.total = (cantidad * this.precio)
    }
}

module.exports = carritoDTO