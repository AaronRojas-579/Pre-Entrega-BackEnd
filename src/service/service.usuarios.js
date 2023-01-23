// const MongoAtlas = require("../../daos/dataBaseMongo")
const daos = require("../../daos/factory")
const modelUsuarios = require("../../daos/models/usuario.model")
const usuarios = new daos(modelUsuarios)

module.exports = usuarios