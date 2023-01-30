const app = require("../src/app")
require("dotenv").config()
const apiProductos = require ("../src/service/utils/apiFaker")
//usaré axios para hacer algunos tests
const axios = require("axios")

//Comando para ejecutar el test 
//npx mocha ./test/apirestfull.test.js

const {expect} =require ("chai")
const supertest = require("supertest")

let request,server

describe("test api rest full",()=>{

    before(async function(){
        server = await initServer();
        request = supertest("http://localhost:8080/test")
        console.log("--Iniciando el Test--")
    })
    after(()=>{
        server.close()
        console.log("--Fin del Test--")
    })

    describe("GET",()=>{
        it("deberia retornar un status 200", async ()=>{
            const response = await request.get("/")
            expect(response.status).to.eql(200)
        })
    })

    describe("POST",()=>{
        it("deberia incorparar un producto",async ()=>{
            const producto  = (apiProductos(1))[0]
            console.log(`Producto de prueba`, producto)
            const response = await request.post("/").send(producto)
            expect(response.status).to.eql(200)

            const pro = response.body
            expect(pro).to.include.keys("nombre","precio","foto")
            expect(pro.nombre).to.eql(producto.nombre)
            expect(pro.precio).to.eql(producto.precio)
            expect(pro.foto).to.eql(producto.foto)
        })
    })

    describe('Test de 2 Porductos', () => { 
        it("deberia devolverme 2 productos", async ()=>{
            const productos2 = (await axios.get(`http://localhost:8080/test/2`)).data
            expect(productos2.length).to.eql(2)
        })
     })

     describe('Test de error al cargar 0 productos', () => { 
        it("deberia devolverme 2 productos", async ()=>{
            const response = await request.get("/0")
            expect(response.status).to.eql(400)
        })
     })


})


async function initServer(){
    return new Promise ((resolve,reject)=>{
        const PORT = process.env.PORT || 8080;
        const server = app.listen(PORT,()=>{
            console.log(`Server listen on PORT ${PORT}`)
            resolve(server)
        });
        server.on('error',(error)=>{
            console.log(`Error en el servidor ${error}`)
            reject(error)
        })
    })
}


