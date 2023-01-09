const router = require("express").Router()
//Requerimos la clase de Productos de la base de datos
const MongoAtlas = require("../../daos/dataBaseMongo")
const modelProductos =require("../../daos/models/productos.model")
const productos = new MongoAtlas(modelProductos)

router.get("/eliminar/:id", async (req,res)=>{
    try{
        const {id}=req.params;
        await productos.deleteById(id)
        console.log("Producto Eliminado")
        res.redirect("/passport")
    }catch(err){
        console.log(err)
    }
})

router.get("/formUpdate/:id", async (req,res)=>{
    try{
        const {id}=req.params;
        const product = (await productos.getById(id))[0]
        res.render("pages/formUpdate",{product})

    }catch(err){
        console.log(err)
    }
})

router.post("/editar/:id", async (req,res)=>{
    try{
        const {id} = req.params
        const nuevoProducto = {
            nombre:req.body.nombre,
            calidad:req.body.calidad,
            precio:req.body.precio
        }
        await productos.updateById(id,nuevoProducto)
        console.log(`Producto Actulizado con exito`)

        res.redirect("/passport")

    }catch(err){
        console.log(err)
    }
})

router.get("/agregarCarrito",async(req,res)=>{
    try{
        const {id,cant} = req.query
        const productoPedido = (await productos.getById(id))[0]

        const nuevoPedido = {
            id,
            productoPedido,
            cant,
            total:(cant * productoPedido.precio)
        }


        const arrPedidos = req.session.pedidos
        //en req.session es donde se puede guardar cosas a la sesseion iniciada
        console.log(arrPedidos)

        if(arrPedidos){
            //si pasa por aqui es que ya existe 
            const pedidosMenos = req.session.pedidos.filter(elem => elem.id != nuevoPedido.id )
            pedidosMenos.push(nuevoPedido)
            // arrPedidos.push(nuevoPedido)
            req.session.pedidos = pedidosMenos

        }else{
            const pedidos = []
            pedidos.push(nuevoPedido)
            req.session.pedidos = pedidos
        }

        console.log(req.session.pedidos)

        res.redirect("/passport/api")
        
    }catch(err){
        console.log(err)
    }
})

router.get("/eliminarCarrito/:id",(req,res)=>{
    try{
        const {id} =req.params
        const user = req.user
        const pedidos = req.session.pedidos.filter(e=>e.id != id)
        req.session.pedidos = pedidos
        res.render("pages/carrito.ejs",{pedidos,user})
    }catch(err){
        console.log(err)
    }
})

//Enviamos el mensaje con los pedidos a Whatsapp 
require("dotenv").config()
const {enviarMensajeWhatsapp,mensajePedidos} = require("../utils/whatsapp")
const {enviarMail} =require("../utils/gmail")


router.get("/comprarCarrito", async (req,res)=>{
    try{
        const listaDeCompras = req.session.pedidos.map(e=>{
            return {
                nombre :e.productoPedido.nombre,
                cantidad: e.cant,
                total : e.total
            }
        })
        const user = req.user 
        const numeroVendedor = process.env.MY_NUMBER
        const mensajePedido  = mensajePedidos(listaDeCompras)
        await enviarMensajeWhatsapp (mensajePedido,user)
        // res.send(`Tu pedido esta en proceso en caso de duda sobre tu pedido podes hablar a este numbero ${process.env.MY_NUMBER}`)
        await enviarMail(user.email,mensajePedido,numeroVendedor)

        res.render("pages/compraRealizada.ejs",{numeroVendedor})
    }catch(err){
        console.log(err)
    }
})



module.exports = router