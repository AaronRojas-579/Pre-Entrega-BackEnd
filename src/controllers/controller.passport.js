
//Requerimos el api Faker
const apiFaker = require("../service/utils/apiFaker")

//Agredamos los Loggers 
const {loggerConsola,loggerWarn,loggerError} = require("../service/utils/loggers")

//Configuración en el caso que el usario no sea administrador
const sessionGet = (req,res)=>{
    try{
         if(req.user.admin){
             res.redirect("./admin")
         }else{
            res.redirect("/passport/api")
         }

    }catch(err){
        loggerError.error(err)
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
        loggerError.error(err)
    }
}

const productos = require("../service/service.productos")

const apiProductos = async (req,res)=>{
    try{
        const cant = parseInt(req.query.cant) || 5;
        const api = apiFaker(cant);
        const user = req.user
        const produtosLista = await productos.getAll()
        res.render("pages/apiFaker.ejs",{api,user,produtosLista})
    }catch(err){
        loggerError.error(err)
    }
}

module.exports = {sessionGet,sessionLogout,apiProductos}