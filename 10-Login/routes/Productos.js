const express = require("express")
const router = express.Router()

const { logged, getDefault, getProducts, postProduct, putProduct, deleteProduct } = require('../controllers/productos.controller')

router.get("/", logged, getDefault)

router.get("/productos", logged, getProducts)

router.get("/productos/:id", logged, getProducts)

router.post("/productos", logged, postProduct)

router.put("/productos/:id", logged, putProduct)

router.delete("/productos/:id", logged, deleteProduct)


module.exports = router