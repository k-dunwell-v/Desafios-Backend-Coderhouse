const Contenedor = require("./contenedor.js")

const archivo = new Contenedor("./productos.txt")

// Creé un handler para no tener que comentar las funciones que no fuese a utilizar!
function fileHandler(opcion, id) {

    switch (opcion) {

        case 1:
            archivo.save( 
                {
                    "title": "Chaqueta navy",
                    "price": 40,
                    "thumbnail": "https://secureservercdn.net/198.71.233.61/v8u.b99.myftpupload.com/wp-content/uploads/2021/03/Artboard-10-copy-3-100.jpg"
                }
            )
          break;

        case 2:
            archivo.getById(id)
            break;

        case 3:
            archivo.getAll()
            break;

        case 4:
            archivo.deleteById(id)
            break;

        case 5:
            archivo.deleteAll()
            break;
    }
          
}

// El primer parametro es la opción del switch, el segundo es OPCIONAL, sería el "id"
fileHandler(3)

// 1. save()

// 2. getById()

// 3. getAll()

// 4. deleteById()

// 5. deleteAll()










