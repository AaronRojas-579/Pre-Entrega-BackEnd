const MongoAtlas = require("../../daos/dataBaseMongo")
const modelMensajes  = require("../../daos/models/mensaje.model")

const mensajes = new MongoAtlas(modelMensajes)

module.exports = mensajes