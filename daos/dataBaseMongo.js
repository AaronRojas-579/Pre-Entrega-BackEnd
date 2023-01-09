// Para crear una clase para el manejo de la Base de Datos MongoDB Atlas debemos requerir mongoose, instalada previamente (npm i mongoose)
const mongoose = require('mongoose')

//Configuración desconocida(mongoose me recomendo colocarla)
mongoose.set('strictQuery',false)
//[MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.

//Requerimos la varibales de entorno porque la utilizaremos para url de la conexion con nuestra app
require('dotenv').config()

//Agredamos los Loggers 
const {loggerConsola,loggerWarn,loggerError} = require("../src/utils/loggers")

class MongoDB {
    constructor(model){
     this.model = model,
     this.connetc()
     //para que una vez creada una variable con esta clase ya se ejecute la funcion this.connect()
    }
    connetc(){
        try{
            const URL = "mongodb+srv://aaronrojas:aTS3dsE5dG8Q3nUc@cluster0.iy3iqn0.mongodb.net/ecommerce";
            //Configuración de MongoDB
            mongoose.connect(URL,{
                useNewUrlParser:true,
                useUnifiedTopology:true,
            })
            loggerConsola.info(`Base de Datos Conectada`)
        }catch(error){
            loggerError.error(error)
        }
    }
    async save(Obj){
        try{
            if(Obj.length !== undefined ){
                await this.model.insertMany(Obj);
                loggerConsola.info(`Nuevos dato cargados a la base de datos`)
            }else{
                await this.model.insertMany(Obj)
                //no existe la funcion 'insert' solo esta 'insertMany'
                loggerConsola.info(`Nuevo dato cargado a la base de datos`)   
            }
        }catch(error){
            loggerError.error(error)
        }
    }
    async getAll(){
        try{
            const data = await this.model.find({})
            return data;
        }catch(error){
            loggerError.error(error)
        }
    }
    async getById(idABuscar){
        try{
            const data = await this.model.find({_id:idABuscar})
            return data;
        }catch(error){
            loggerError.error(error)
        }
    }
    async updateById(idAModificar,modificaciones){
        try{
            await this.model.updateOne({"_id":idAModificar},{$set:modificaciones})
            loggerConsola.info(`Dato modificado`)
        }catch(error){
            loggerError.error(error)
        }
    }
    async getByUsername (username){
        try{
            const data = await this.model.find({username:username});
            // console.log(data)
            return data;
        }catch(err){
            loggerError.error(err)
        }
    }
    async deleteById(idAEliminar){
        try{
            await this.model.deleteOne({_id:idAEliminar})
            loggerConsola.info(`Dato Eliminado`)
        }catch(error){
            loggerError.error(error)
        }
    }
    async deleteAll(){
        try{
            await this.model.deleteMany({})
            loggerConsola.info(`Todos los datos han sido eliminados`)
        }catch(error){
            loggerError.error(error)
        }
    }
}

module.exports = MongoDB