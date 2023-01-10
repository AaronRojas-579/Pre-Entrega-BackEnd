//Agredamos los Loggers 
const {loggerConsola,loggerWarn,loggerError} = require("../service/utils/loggers")


const authenticate = (req,res,next)=>{
    try{
        if(!req.isAuthenticated()){
            return res.redirect("/")
        }else{
            next()
        }
    
    }catch(err){
        loggerError.error(err)
    }
}

module.exports = authenticate