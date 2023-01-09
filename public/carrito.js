
const sumarCarrito = (id)=>{
    let cantidad  = parseInt(document.getElementById(id).innerText)
    cantidad  = cantidad + 1
    document.getElementById(id).innerText = cantidad
}   

const restarCarrito = (id)=>{
    let cantidad  = parseInt(document.getElementById(id).innerText)
    if(cantidad !== 0){
        cantidad -= 1
        document.getElementById(id).innerText = cantidad
    }
}

const agregarCarrito = (id)=>{
    let cantidad  = parseInt(document.getElementById(id).innerText);
    if(cantidad != 0){
        location.href = `/crud/agregarCarrito?id=${id}&cant=${cantidad}`
    }else{
        alert("Ingrese una cantidad para agregar al Carrito")
    }
}