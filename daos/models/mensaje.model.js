const { Schema,model } = require("mongoose")

const mensajeSchema = new Schema({
    author:{
        nombre:{
            type:String,
            required:true,
            max:100,
        },
        date:{
            type:String,
            required:true
        }
    },
    text:{
        type:String,
        required:true,
        max:120,
    }

})

module.exports = model("Mensaje",mensajeSchema)