const express = require("express")
const app = express()
require("dotenv").config()
//Importamos la rutas ya configuradas
const routeAdmin = require('./rutas/rutasAdmin')
const rutasPassport = require("./rutas/rutasPassport")
const routasCrud = require("./rutas/crudProductos")

//Configuraciones necesarias para el uso correcto del POST desde el frontend
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Middleware para usar public como ruta predeterminada (archivos estaticos)
app.use(express.static('public'))
//Agredamos los Loggers 
const {loggerConsola,loggerWarn,loggerError} = require("./utils/loggers")

//-----------------------------

const session = require("express-session")
const cookieParser = require("cookie-parser")
app.use(cookieParser())

app.use(session({
    secret:process.env.PALABRA_SECRETA,
    cookie:{
        httpOnly:false,
        secure:false,
        //nunca pasarla a true, no puedo iniciar session
        maxAge:1000*60*24
    },
    rolling:true,
    resave:true,
    //para guardar nuevas varibles en req.user
    saveUninitialized:true,
    // para renombrar variables de req.user y guardarlas automaticamente
}))

// Configuración de passport 

const passport = require("./middleware/passport")

app.use(passport.initialize())
app.use(passport.session())

//------------------------------

//Aqui colocamos las rutas
app.use('/admin',routeAdmin)
app.use('/passport',rutasPassport)
app.use("/crud",routasCrud)

//Importamos el DAOS
const MongoDB = require('../daos/dataBaseMongo')

//Productos
const modelProductos = require('../daos/models/productos.model')
const productos = new MongoDB(modelProductos)

//Mensajes
const modelMensajes = require('../daos/models/mensaje.model')
const mensajes = new MongoDB(modelMensajes)

//Motores de plantilla 
app.set('view engine','ejs') //Aqui indicamos qué motor de plantilla usaremos 
app.set('views','views') //Indicamos en donde se ubica la carpeta views

//-----------------------------

//Instanciamos el Socket.io

const {Server : HttpServer} = require('http');
const {Server : IOServer} = require('socket.io')
const httpServer = new HttpServer(app);
const io = new IOServer (httpServer);

//Configuarión del Socket.io

io.on('connection',async socket =>{
    loggerConsola.info('Nuevo Cliente conectado')
    //Este evento se carga cada vez que un nuevo cliente se conecte 

    //CONFIGARCIÓN DEL SOCKET.IO PARA EL LA LISTA DE PRODUCTOS

    var productosListar = await productos.getAll();
    socket.emit('producto',productosListar)
    //Este socket.emit enviar un mensaje al front desde el backEnd, en este caso lo que envia es el mensaje 'producto' con toda la liste de productos
    socket.on('nuevoProducto',async nuevoProducto =>{
        await productos.save(nuevoProducto)
        productosListar =   await productos.getAll()
        //Este evento envía un nuevo mensaje a todos los clientes que estén conectado en ese momento
        io.sockets.emit('producto', productosListar);
    })
 
     //CONFIGARCIÓN DEL SOCKET.IO PARA EL CHAT GLOBAL

     var mensajeListar = await mensajes.getAll();
     socket.emit("mensajes",mensajeListar)

     socket.on("nuevoMensaje",async nuevoMensaje=>{
        await mensajes.save(nuevoMensaje);
        mensajeListar = await mensajes.getAll()
        io.sockets.emit("mensajes",mensajeListar);
     })
})


module.exports = httpServer

