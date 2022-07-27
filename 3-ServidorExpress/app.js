const express = require("express")
const fs = require("fs")

const app = express()

app.get("/", (req, res) => {
    res.send('<ul><li><h1><a href="http://localhost:8080/productos">Productos!</a></h1></li><li><h1><a href="http://localhost:8080/productoRandom">Producto sorpresa!</a></h1></li></ul>')

    
})

app.get("/productos", (req, res) => {

    fs.readFile("./../2-ManejoArchivos/productos.txt", "utf-8", (err, products) => {
        
        if (err) {
            res.send("No puedo, toy chikito :(")
        }else{
            res.send(products)
        }
    })
    
})

app.get("/productoRandom", (req, res) => {

    fs.readFile("./../2-ManejoArchivos/productos.txt", "utf-8", (err, products) => {
        
        if (err) {
            res.send("No puedo, toy chikito :(")
        }else{
            const parsedProducts = JSON.parse(products)
            const randomNum = Math.floor(Math.random() * parsedProducts.length)
            res.send(JSON.stringify(parsedProducts[randomNum]))
        }
    })
    
})

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${server.address().port}`)

})

server.on("error", err => console.log(err))