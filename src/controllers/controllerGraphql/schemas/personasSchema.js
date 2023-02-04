const {buildSchema  } = require("graphql")
const schemaPersona = buildSchema(`
input PersonaInput {
    nombre: String,
    edad: Int
  }
  type Persona {
    id: ID!
    nombre: String,
    edad: Int
  }
  type Query {
    getPersona(id: ID!): Persona,
    getPersonas(campo: String, valor: String): [Persona],
  }
  type Mutation {
    createPersona(datos: PersonaInput): Persona
    updatePersona(id: ID!, datos: PersonaInput): Persona,
    deletePersona(id: ID!): Persona,
  } 
`)

module.exports = schemaPersona