const {Schema,model} = require('mongoose')

const productosSchema = new Schema({
    nombre:{
        type:String,
        required:true,
        max:100,
        unique:true,
    },
    calidad:{
        type:String,
        required:true,
    },
    precio:{
        type:Number,
        required:true,
    },
});

module.exports = model('Productos',productosSchema)

//Si quiero copiar el model de otra coleccion ya existente en la base de datos debe estar exactamente igual