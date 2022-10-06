const express = require("express")
const app = express()
const { Server:HttpServer } = require("http")
const httpServer = new HttpServer(app)
const { Server:ServerIo } = require("socket.io")
const io = new ServerIo(httpServer)
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const mongoStore = require('connect-mongo')



app.set("view engine", "pug")
app.set("views", "./views")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.use(cookieParser(process.env.COOKIES_SECRET || 'cwcQ9*5j3Ia0m7GFug#b'))

app.use(session({
    secret: process.env.SESSION_SECRET || 'IFnB2Q7hfqqI3w7H',
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: { maxAge: 600000 },
    store: mongoStore.create({mongoUrl:'mongodb+srv://keith:yAk4wvBuSoPI5zO4@cluster0.ijmkqg9.mongodb.net/?retryWrites=true&w=majority', mongoOptions:{useNewUrlParser:true, useUnifiedTopology: true}})

}))

app.use(logger('dev'))

const productsRouter = require('./routes/Productos')
const sessionRouter = require('./routes/session')
const testRouter = require('./routes/Test')

app.use("/api/", productsRouter)
app.use("/api/", testRouter)
app.use("/api/session", sessionRouter)

app.use( (req, res) => {
    res.status(404);
    res.send("...huh?");
})


//////////////////////////////////////////////////////
////////////////////////CLIENTE///////////////////////
//////////////////////////////////////////////////////

const ProductosDaosFirebase = require('./daos/ProductosDaosFirebase')
const db = new ProductosDaosFirebase()

const ChatDaosFirebase = require('./daos/ChatDaosFirebase')
const { Session } = require("inspector")
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


module.exports = {
    app,
    httpServer,
    io
}