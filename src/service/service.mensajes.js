// const MongoAtlas = require("../../daos/dataBaseMongo")
const daos = require("../../daos/factory")
const modelMensajes  = require("../../daos/models/mensaje.model")

const mensajes = new daos(modelMensajes)

module.exports = mensajes