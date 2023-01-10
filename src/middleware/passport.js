
//Configuración para passport 

const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const bCrypt = require("bcrypt")

//Base de datos de los usuarios

//Requrimos Funcion para Enviar mails
const {enviarMail,mailNuevoRegistro} =require("../service/utils/gmail")

// const MongoAtlas = require("../../daos/dataBaseMongo")
// const modelUsuarios = require("../../daos/models/usuario.model")
// const usuarios = new MongoAtlas(modelUsuarios)

//Lo importamos del service
const usuarios = require("../service/service.usuarios")

//Agredamos los Loggers 
const {loggerConsola,loggerWarn,loggerError} = require("../service/utils/loggers")

//Funciones para Encriptar

function isValidPassword (user,password){
    return bCrypt.compareSync(password,user.password)
}

function createHash(password){
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null
        )
}

//Configuración para passport 

passport.use("login",new LocalStrategy(async (username,password,done)=>{
    try{
        let user = (await usuarios.getByUsername(username))[0]
        if(!user){
            loggerWarn.warn(`Usuario no encontrado con el username ${username}`)
            return done(null,false)
        }else if(!isValidPassword(user,password)){
            loggerWarn.warn(`Contraseña invalida`)
            return done(null,false)
        }else{ 
            return done(null,user)
        }
    }catch(err){
        loggerError.error(err)
    }
}))

passport.use("register",new LocalStrategy({
    passReqToCallback:true,
},
async (req,username,password,done)=>{
    try{
        let user = await usuarios.getByUsername(username);
        if(user.length !== 0){
            loggerWarn.warn(`Ya existe un usuario con este username`)
            return done(null,false)
        }
        const newUser = {
            username,
            password:createHash(password),
            email:req.body.email,
            tel:req.body.tel,
            url:req.body.url,
            admin:req.body.admin

        }
        //Enviamos un mail 
        await mailNuevoRegistro(newUser)
        await usuarios.save(newUser)
        const nuevoUsuario =( await usuarios.getByUsername(username))[0]
        return done(null,nuevoUsuario)

    }catch(err){
        loggerError.error(err)
    }
}   
))

// Función para Serializar 

passport.serializeUser((user,done)=>{
    done(null,user._id);
})

// Función para Deserializar

passport.deserializeUser(async(id,done)=>{
    const user = (await usuarios.getById(id))[0];
    done (null,user)
})

module.exports = passport