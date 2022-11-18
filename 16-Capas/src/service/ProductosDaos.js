const Contenedor = require('../DAO/contenedor')

class ProductosDaos extends Contenedor {
    constructor() {
        super('../models/productos.model')
    }
}

module.exports = ProductosDaos