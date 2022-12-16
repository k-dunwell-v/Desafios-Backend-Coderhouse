const express = require("express")
const router = express.Router()

const { getProducts, getProductById, postProduct, putProduct, deleteProduct } = require('../controllers/productos.controller')

router.get("/", getProducts)

router.get("/productos", getProducts)

router.get("/productos/:id", getProductById)

router.post("/productos", postProduct)

router.put("/productos/:id", putProduct)

router.delete("/productos/:id", deleteProduct)


module.exports = router