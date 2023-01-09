const {Schema, model} = require ("mongoose");
const usuarioSchema = new Schema({
    username:{
        type:String,
        required:true,
        max:100
    },
    password:{
        type:String,
        required:true,
        max:120,
    },
    email:{
        type:String,
        required:true,
        max:100,
    },
    tel:{
        type:String,
        required:true,
        max:50,
    },
    url:{
        type:String,
        required:true,
    },
    admin:{
        type:Boolean,
        required:true,
    }
})

module.exports = model("Usuarios",usuarioSchema);