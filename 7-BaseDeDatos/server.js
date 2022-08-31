const express = require("express")
const { Server:HttpServer } = require("http")
const { Server:ServerIo } = require("socket.io")
const app = express()
const httpServer = new HttpServer(app)
const io = new ServerIo(httpServer)

const PORT = process.env.PORT || 8080

app.set("view engine", "pug")
app.set("views", "./views")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))


const Contenedor = require('./public/contenedor')
const db = new Contenedor('products')

const ContenedorChat = require('./public/contenedorChat')
const chatdb = new ContenedorChat('chat')


//////////////////////////////////////////////////////
////////////////////////CLIENTE///////////////////////
//////////////////////////////////////////////////////

io.on('connection', (socket) => {
    console.log('Unknown bunny connected')

    db.get().then((products) => {
        socket.emit('connection', {"products": products})
    }).catch((err) => {
        (err['code'] === 'ER_NO_SUCH_TABLE') ? db.createTable() : console.log(err) ; throw err
    })

    chatdb.get().then((msgs) => {
        socket.emit('connection', {"messages":msgs})
    }).catch((err) => {
        chatdb.createTable()
        console.log(err) ; throw err
    })

    // NUEVOS PRODUCTOS
    socket.on('postProduct', (product) => {
        db.add(product)
        io.emit('postProduct', product)
    })

    // NUEVOS MENSAJES DEL CHAT
    socket.on('chatter', (message) => {
        chatdb.add(message)
        io.emit('chatter', message)
    })
})


//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////


const productsRouter = require("./routes/Products")
app.use("/", productsRouter)

app.use( (req, res) => {
    res.status(404);
    res.send("...huh?");
})

httpServer.listen(PORT, err => {
    if (err) throw err
    console.log("Server running on port 8080")
})