const supertest = require('supertest')
const { expect } = require('chai')
const newProduct = require('./newProduct')
const { httpServer } = require('../src/app')

let server
let request

describe('test api rest full', () => {

    before(async () => {
        server = await startServer()
        request = supertest(`http://localhost:${server.address().port}/api/productos`)
    })

    after( () => {
        server.close()
    })

    describe('GET', () => {
        it('Debe retornar status 200', async () => {
            const response = await request.get('/')
            expect(response.status).to.eql(200)
            console.log(response.body)
        })
    })

    describe('POST', () => {
        it('Debe agregar un producto', async () => {
            const producto = newProduct()
            console.log('Producto para prueba:', producto)
            const response = await request.post('/').send(producto)
            expect(response.status).to.eql(200)
            console.log(response.body)
        })
    })

    describe('PUT', () => {
        it('Debe actualizar un producto', async () => {
            const producto = newProduct()
            console.log('Stock para prueba:', producto.stock)
            const response = await request.put('/633f6f1317b4338f2bbdaff5').send({
                "title": "Dieta BARF – Pollo y Res – Perros",
                "thumbnail": "https://snouts.com.co/wp-content/uploads/2020/02/Snouts-Pollo-Res.png",
                "detail": "Pollo, Huesos carnudos de pollo, Vísceras de Res, Zanahoria, Espinaca, Acelga, Huevo, Avena, Salvado de Trigo, Vinagre de Manzana.",
                "price": 5600,
                "stock": producto.stock,
            })
            expect(response.status).to.eql(200)
            console.log(response.body)

        })
    })

    describe('DELETE', () => {
        it('Debe eliminar un producto', async () => {
            const prueba = '638e852c56135267a826e2c4' //solo puede usarse una vez, pues va a eliminarse
            const response = await request.delete('/'+prueba)
            expect(response.status).to.eql(200)
            console.log(response.body)
        })
    })

})


async function startServer() {
    return new Promise((resolve, reject) => {
        const PORT = 0
        const server = httpServer.listen(PORT, () => {
            console.log(`Servidor express escuchando en el puerto ${server.address().port}`);
            resolve(server)
        });
        server.on('error', error => {
            console.log(`Error en Servidor: ${error}`)
            reject(error)
        });
    })
}
