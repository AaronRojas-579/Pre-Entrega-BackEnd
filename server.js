const app = require("./src/app")
//Requirimos la variables de entorno
require('dotenv').config()

//Agredamos los Loggers 
const {loggerConsola,loggerWarn,loggerError} = require("./src/utils/loggers")

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    loggerConsola.info(`Server listen on PORT ${PORT}`)
}).on('error',(error)=>loggerConsola.info(`Error en el servidor ${error}`))
//Esta configuración del .on mantiene a la escucha de errores
