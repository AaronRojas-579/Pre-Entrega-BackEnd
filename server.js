//Requirimos la variables de entorno
require('dotenv').config()
//Agredamos los Loggers 
const {loggerConsola,loggerWarn,loggerError} = require("./src/utils/loggers")

const cluster = require("cluster")
const {cpus} = require("os")

const PORT = process.env.PORT || 8080;
const modoCluster = process.argv[2] ==  "CLUSTER"
// console.log(modoCluster)

if(modoCluster && cluster.isPrimary){
    const numCPUs = cpus().length
    loggerConsola.info(`Número de procesadores ${numCPUs}`)
    loggerConsola.info(`PID Master ${process.pid}`)
    for(let i = 0; i<numCPUs; i++){
        cluster.fork()
    }
    cluster.on("exit",worker=>{
        loggerConsola.info(`Worker ${worker.process.pid} died ${new Date().toLocaleString}`)
        cluster.fork()
    })
}else{
    const app = require("./src/app")

    app.listen(PORT,()=>{
        loggerConsola.info(`Server listen on PORT ${PORT}`)
    }).on('error',(error)=>loggerConsola.info(`Error en el servidor ${error}`))
    //Esta configuración del .on mantiene a la escucha de errores
}

