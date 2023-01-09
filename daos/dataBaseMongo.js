// Para crear una clase para el manejo de la Base de Datos MongoDB Atlas debemos requerir mongoose, instalada previamente (npm i mongoose)
const mongoose = require('mongoose')

//Configuración desconocida(mongoose me recomendo colocarla)
mongoose.set('strictQuery',false)
//[MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.

//Requerimos la varibales de entorno porque la utilizaremos para url de la conexion con nuestra app
require('dotenv').config()


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
            console.log(`Base de Datos Conectada`)
        }catch(error){
            console.log(error)
        }
    }
    async save(Obj){
        try{
            if(Obj.length !== undefined ){
                await this.model.insertMany(Obj);
                console.log(`Nuevos dato cargados a la base de datos`)
            }else{
                await this.model.insertMany(Obj)
                //no existe la funcion 'insert' solo esta 'insertMany'
                console.log(`Nuevo dato cargado a la base de datos`)   
            }
        }catch(error){
            console.log(error)
        }
    }
    async getAll(){
        try{
            const data = await this.model.find({})
            return data;
        }catch(error){
            console.log(error)
        }
    }
    async getById(idABuscar){
        try{
            const data = await this.model.find({_id:idABuscar})
            return data;
        }catch(error){
            console.log(error)
        }
    }
    async updateById(idAModificar,modificaciones){
        try{
            await this.model.updateOne({"_id":idAModificar},{$set:modificaciones})
            console.log(`Dato modificado`)
        }catch(error){
            console.log(error)
        }
    }
    async getByUsername (username){
        try{
            const data = await this.model.find({username:username});
            // console.log(data)
            return data;
        }catch(err){
            console.log(err)
        }
    }
    async deleteById(idAEliminar){
        try{
            await this.model.deleteOne({_id:idAEliminar})
            console.log(`Dato Eliminado`)
        }catch(error){
            console.log(error)
        }
    }
    async deleteAll(){
        try{
            await this.model.deleteMany({})
            console.log(`Todos los datos han sido eliminados`)
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = MongoDB