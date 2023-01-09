
//Requerimos el api Faker
const apiFaker = require("../utils/apiFaker")

//Configuración en el caso que el usario no sea administrador
const sessionGet = (req,res)=>{
    try{
         if(req.user.admin){
             res.redirect("./admin")
         }else{
            res.redirect("/passport/api")
         }

    }catch(err){
        console.log(err)
    }
}

const sessionLogout = (req,res)=>{
    try{
        const user = req.user.username
        req.session.destroy(err=>{
            if(err) return res.send(err)
            res.render(`pages/logout.ejs`,{user})
        })
    }catch(err){
        console.log(err)
    }
}

//Requerimos los productos creados desde la base de datos
const MongoAtlas = require("../../daos/dataBaseMongo")
const modelProductos = require("../../daos/models/productos.model")
const productos = new MongoAtlas(modelProductos)

const apiProductos = async (req,res)=>{
    try{
        const cant = parseInt(req.query.cant) || 5;
        const api = apiFaker(cant);
        const user = req.user
        const produtosLista = await productos.getAll()
        res.render("pages/apiFaker.ejs",{api,user,produtosLista})
    }catch(err){
        console.log(err)
    }
}

module.exports = {sessionGet,sessionLogout,apiProductos}