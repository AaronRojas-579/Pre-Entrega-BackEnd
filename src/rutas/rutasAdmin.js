const express =require('express')
const {Router} = express
const router = Router()

// //Requerimos los productos de la base de datos
// const MongoDB = require("../../daos/dataBaseMongo")
// const modelProductos = require("../../daos/models/productos.model")
// const productos = new MongoDB(modelProductos)

//Importamos los productos del service
const productos =require("../service/service.productos")

//Middleware de authenticate
const middlewareAuth = require("../middleware/authenticate")

router.get("/",middlewareAuth ,async(req,res)=>{
    const user = req.user ;
    const produtosLista = await productos.getAll()
    res.render("pages/index.ejs",{produtosLista,user})
})

router.post("/",async(req,res)=>{
    console.log(req.body)
    await productos.save(req.body)
    res.redirect("/admin")
})

module.exports = router