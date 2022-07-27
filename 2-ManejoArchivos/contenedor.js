const fs = require("fs")

class Contenedor {
    constructor(file){
		this.file = file;
    }

	//save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
	async save(product) {
		
		try{
			const data = await fs.readFileSync(this.file, "utf-8")
			const dataParsed = JSON.parse(data)

			product["id"] = dataParsed.length + 1
			dataParsed.push(product)

			const newText = JSON.stringify(dataParsed)
			fs.writeFileSync(this.file, newText)

		}catch (err) {
			console.error(err)
		}

	}

	//getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.	
	async getById(id) {

		try{
			const data = await fs.readFileSync(this.file, "utf-8")
			const dataParsed = JSON.parse(data)
			const getProduct = dataParsed.findIndex((product => product["id"] === id))

			console.log(dataParsed[getProduct] || "El ID ingresado no existe.")

		}catch (err) {
			console.error(err)
		}


	}

	//getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
	async getAll() {
		try{
			const data = await fs.readFileSync(this.file, "utf-8")
			const dataParsed = JSON.parse(data)

			console.log(dataParsed)

		}catch (err) {
			console.error(err)
		}
	}

	//deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
 	async deleteById(id) {

		try{
			const data = await fs.readFileSync(this.file, "utf-8")
			const dataParsed = JSON.parse(data)
			const getProduct = dataParsed.findIndex((product => product["id"] === id))

			if (getProduct > -1) {
				dataParsed.splice(getProduct, 1)

				const newText = JSON.stringify(dataParsed)
				fs.writeFileSync(this.file, newText)

				console.log("Producto eliminado")

			}else{
				console.log("El ID ingresado no existe.")
			}

		}catch (err) {
			console.error(err)
		}

	}
	
	//deleteAll(): void - Elimina todos los objetos presentes en el archivo.
	async deleteAll() {
		fs.writeFileSync(this.file, "[]")
	}

}

module.exports = Contenedor