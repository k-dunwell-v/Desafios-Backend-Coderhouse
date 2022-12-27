
const Koa = require('koa')
const mount = require('koa-mount')
const { graphqlHTTP } = require('koa-graphql')
const { buildSchema } = require('graphql')

const app = new Koa();

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

app.listen(8080);

app.use(mount('/graphql', graphqlHTTP({
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
})))

app.on('error', err => {
    log.error('server error', err)
})
  


