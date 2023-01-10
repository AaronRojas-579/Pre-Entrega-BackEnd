const MongoAtlas = require("../../daos/dataBaseMongo")
const modelUsuarios = require("../../daos/models/usuario.model")
const usuarios = new MongoAtlas(modelUsuarios)

module.exports = usuarios