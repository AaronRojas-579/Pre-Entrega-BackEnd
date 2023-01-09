setInterval(()=>{
    let a = parseInt(document.getElementById('time').innerText)
    //La manera de capturar el contenido de una etiqueta y parsearlo a un int
    if(a > 0){
        a -= 1;
        document.getElementById('time').innerText = a;
    }else{
        clearInterval()
        location.href = '/';
        //funcion para redirigir las rutas desde el cliente
    }
},1000)