const log4js = require("log4js")

log4js.configure({
    appenders:{
        miLoggerConsole: {type:'console'},
        miLoggerFile:{type:'file',filename:'info.log'},
        miLoggerFile2 :{type:'file',filename:'info2.log'}
    },
    categories:{
        default:{appenders:["miLoggerConsole"],level:"trace"},
        consola:{appenders:["miLoggerConsole"],level:'debug'},
        info:{appenders:["miLoggerConsole"],level:"info"},
        archivo:{appenders:["miLoggerFile"],level:'warn'},
        archivo2:{appenders:["miLoggerFile2"],level:"error"}
    }
})

const loggerConsola = log4js.getLogger("consola");
const loggerWarn = log4js.getLogger("archivo");
const loggerError = log4js.getLogger("archivo2")

module.exports = {
    loggerConsola,
    loggerWarn,
    loggerError
}
