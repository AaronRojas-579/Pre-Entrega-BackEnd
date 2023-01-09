
const router = require("express").Router()
const authenticate = require("../middleware/authenticate")

//Importamos los controllers
const{sessionGet,sessionLogout,apiProductos} =require("../controllers/controller.passport")
const passport = require("passport")

router.get("/",authenticate,sessionGet)
router.get("/api",authenticate,apiProductos)

//En sessionLogout me lo va a redirigir a un archivo ejs
router.get("/logout",sessionLogout)

router.post("/login",passport.authenticate("login",{
    failureRedirect:"./login/error",
}),
(req,res)=>{
    res.redirect(`/passport`)
},
//Esta es una forma de manejar el successRedirect por medio de una callback ya que passport solamente es un middleware
)

router.post("/register",passport.authenticate("register",{
    successRedirect:"/",
    failureRedirect:"/passport/register/error"
}))

//Rutas para los errores 

router.get("/login/error",(req,res)=>{
    res.render("pages/errorLogin.ejs")
})

router.get("/register/error",(req,res)=>{
    console.log(req.body)
    res.render("pages/errorRegister.ejs")
})

router.get("/verCarrito",(req,res)=>{
    try{
        const pedidos = req.session.pedidos;
        const user = req.user;
        // res.json({pedidos,user})
        res.render("pages/carrito.ejs",{pedidos,user})
    }catch(err){
        console.log(err)
    }
})

module.exports = router