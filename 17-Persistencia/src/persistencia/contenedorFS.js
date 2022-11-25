const fs = require("fs")

class Contenedor {
    constructor(file){
		this.file = file;
    }

	async get(id) {

		if (id){
			try{
				const data = await fs.readFileSync(this.file, "utf-8")
				const dataParsed = JSON.parse(data)
				const getProduct = dataParsed.findIndex((product => product["id"] === id))
	
				return dataParsed[getProduct] || []
	
			}catch (err) {
				if (err.errno === -4058) {
					fs.writeFileSync(this.file, "[]")
					return []
				}else{
					console.error(err)
				}
			}
		}else{
			try{
				const data = await fs.readFileSync(this.file, "utf-8")
				const dataParsed = JSON.parse(data)
	
				return dataParsed
	
			}catch (err) {
				if (err.errno === -4058) {
					fs.writeFileSync(this.file, "[]")
					return []
				}else{
					console.error(err)
				}
				
			}
		}
		
	}

	async add(product) {

		fs.readFile(this.file, "utf-8", (err, products) => {
        
            if (err) {
                product["id"] = 1
                const newText = JSON.stringify([product])
                fs.writeFileSync(this.file, newText)
    
            }else{
                const dataParsed = JSON.parse(products)
                product["id"] = dataParsed.length + 1
                dataParsed.push(product)
    
                const newText = JSON.stringify(dataParsed)
                fs.writeFileSync(this.file, newText)
            }
    
        })

	}

 	async delete(id) {

		if (id) {
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
				if (err.errno === -4058) {
					fs.writeFileSync(this.file, "[]")
					return []
				}else{
					console.error(err)
				}
			}
		}else{
			fs.writeFileSync(this.file, "[]")
		}

	}

}

module.exports = Contenedor