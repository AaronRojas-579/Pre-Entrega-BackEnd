require("dotenv").config()
const MongoDB = require("./dataBaseMongo")
const {loggerConsola,loggerWarn,loggerError} = require("../src/service/utils/loggers")

let option = process.env.DAOS || " ";

let daos ;

switch(option.toLowerCase()){
    case "mongo":
        daos = MongoDB;
        break;
    default:
        loggerError.error(`Error al encontrar el tipo de DAO a escoger`)
        break;
}

module.exports = daos