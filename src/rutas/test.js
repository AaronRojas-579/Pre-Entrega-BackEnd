const router = require("express").Router()
const apiProductos = require("../service/utils/apiFaker")


router.get("/",(req,res)=>{
    try{
        res.status(200).send("Hola bienvenido al test")
    }catch(err){
        console.log(err)
    }
})

router.post("/",(req,res)=>{
    try{
        const {body} = req
        res.status(200).json(body)
    }catch(err){
        console.log(err)
    }
})

router.get("/:id",(req,res)=>{
    try{
        const {id}=req.params
        if(id != 0){
            const productos = apiProductos(id)
            res.send(productos).status(200)
        }else{
            res.status(400).send(`error al ingresar la cantidad de productos `)
        }
    }catch(err){
        console.log(err)
    }
    
})

module.exports = router