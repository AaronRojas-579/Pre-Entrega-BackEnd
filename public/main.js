
const socket = io.connect();
//Aqui se mantiene a la escucha de cambios

//Code para el CHAT GLOBAL

//Primero vamos a listar los mensaje que ya esten creados

socket.on("mensajes",async menasjes=>{
    // console.log(menasjes);
    const html = await makeHtmlList(menasjes);
    document.getElementById("mostrarMensajes").innerHTML= html;
})

//Pasaremos a crear la funcion para listar los mensajes

function makeHtmlList(menasjes){
    //Aqui podriamos usar un fetch a una plantilla como lo hicimos con la lista de productos , pero lo haremos a mano
    const html = menasjes.map(elem=>{
        return(`
            <div>
                <strong>${elem.author.nombre}</strong> <span style="color:brown">${elem.author.date}</span> : <i style="color:green" >${elem.text}</i>
            </div>
        `)
    }).join(" ");
    //Este join es para que exista una separación entre ellos 
    return html;
}

//Crearemos la funcion para agregar nuevos mensajes

function addMensaje(e){
    console.log("Hola soy la funcion")
    let date = new Date().toLocaleString()
    const mensaje = {
        author:{
            nombre: document.getElementById("nombreMensaje").value,
            date : date
        },
        text: document.getElementById("text").value
    }
    console.log(mensaje)
    socket.emit("nuevoMensaje",mensaje);
    const mensajeForm = document.getElementById("mensaje")
    mensajeForm.reset()
    return false

}