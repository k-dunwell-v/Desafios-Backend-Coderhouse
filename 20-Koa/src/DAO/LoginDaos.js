const Contenedor = require('../DAO/contenedor')

class LoginDaos extends Contenedor {
    constructor() {
        super('../models/usuarios.model')
    }


}



module.exports = LoginDaos
