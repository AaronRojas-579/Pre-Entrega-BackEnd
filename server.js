const app = require("./src/app")
//Requirimos la variables de entorno
require('dotenv').config()

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server listen on PORT ${PORT}`)
}).on('error',(error)=>console.log(`Error en el servidor ${error}`))
//Esta configuración del .on mantiene a la escucha de errores
