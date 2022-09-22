const express = require("express")
const app = express()
const { Server:HttpServer } = require("http")
const httpServer = new HttpServer(app)
const { Server:ServerIo } = require("socket.io")
const io = new ServerIo(httpServer)

const PORT = process.env.PORT || 8080

app.set("view engine", "pug")
app.set("views", "./views")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))


//////////////////////////////////////////////////////
////////////////////////CLIENTE///////////////////////
//////////////////////////////////////////////////////

const ProductosDaosFirebase = require('./daos/ProductosDaosFirebase')
const db = new ProductosDaosFirebase()

const ChatDaosFirebase = require('./daos/ChatDaosFirebase')
const chatdb = new ChatDaosFirebase()

io.on('connection', (socket) => {
    console.log('Unknown bunny connected')

    db.get().then((products) => {
        socket.emit('connection', {"products": products})
    }).catch((err) => {
        console.log(err) ; throw err
    })

    chatdb.crudChat().then((chat) => {
        socket.emit('connection', {"chat":chat})
    }).catch((err) => {
        console.log(err) ; throw err
    })

    // NUEVOS PRODUCTOS
    socket.on('postProduct', (product) => {
        db.add(product)
        io.emit('postProduct', product)
    })

    // NUEVOS MENSAJES DEL CHAT
    socket.on('chatter', (message) => {
        chatdb.crudChat(message)
        io.emit('chatter', message)
    })
})

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////


const productsRouter = require("./routes/Productos")
const testRouter = require("./routes/Test")

app.use("/api/", productsRouter)
app.use("/api/", testRouter)

app.use( (req, res) => {
    res.status(404);
    res.send("...huh?");
})

httpServer.listen(PORT, err => {
    if (err) throw err
    console.log("Server running on port 8080")
})