const express = require("express")
const app = express()
const { Server:HttpServer } = require("http")
const httpServer = new HttpServer(app)
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoStore = require('connect-mongo')
require('dotenv').config()
const compression = require('compression')

app.set("view engine", "pug")
app.set("views", "./src/views")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.use(compression())

const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const { getProducts, getProductById, postProduct, putProduct, deleteProduct } = require('./controllers/productos.controller')

const schema = buildSchema(
    `type Product {
        _id: ID!
        title: String
        thumbnail: String
        detail: String
        price: Int
        stock: Int
    }
  
    type Result {
        acknowledged: String
        deletedCount: Int
    }

    type Query {
        getProducts: [Product]
        getProductById(_id: ID): Product
    }
  
    type Mutation {
        postProduct(
        title: String
        thumbnail: String
        detail: String
        price: Int
        stock: Int
        ): Product

        putProduct(
        _id: ID
        title: String
        thumbnail: String
        detail: String
        price: Int
        stock: Int
        ): Product
  
        deleteProduct(_id: ID): Result

    }`
)

const gqlConfig = graphqlHTTP({
    schema: schema,
    rootValue: {
        getProducts: getProducts,
        getProductById: getProductById,
        postProduct: postProduct,
        postProduct: postProduct,
        putProduct: putProduct,
        deleteProduct: deleteProduct
    },
    graphiql: true,
})

app.use("/graphql", gqlConfig);

app.use(cookieParser(process.env.COOKIES_SECRET))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: { maxAge: 600000 },
    store: mongoStore.create({mongoUrl: process.env.MONGO_URL, mongoOptions:{useNewUrlParser:true, useUnifiedTopology: true}})

}))


//////////////////////////////////////////////////////
///////////////// LOGGERS & ROUTERS //////////////////
//////////////////////////////////////////////////////

const { logger, getDate } = require('../logs/logger')

app.use((req, res, next) => {
    const { method, url } = req.socket['parser'].incoming
    logger.info(`${getDate()} ${method} ${url}`) 
    next()
})

// const productsRouter = require('./routes/Productos')
// app.use("/api/", productsRouter)

app.use((req, res) => {
    const { url, method } = req.socket['parser'].incoming
    logger.warn(`Ruta ${url} con método ${method} no implementada`)
    res.status(404).send(`Ruta ${url} con método ${method} no implementada`)
})


//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

module.exports = {
    app,
    httpServer
}