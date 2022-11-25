const Contenedor = require('../persistencia/contenedor')
const ContenedorFS = require('../persistencia/contenedorFS')

class ProductosDaos extends Contenedor {
    constructor() {
        super('../models/productos.model')
    }
}

class ProductosDaosFS extends ContenedorFS {
    constructor() {
        super('./src/DB/products.txt')
    }
}



let db
switch ('') {
    case 'MONGO':
        db = new ProductosDaos()
        break
    default:
        db = new ProductosDaosFS()
}


module.exports = db