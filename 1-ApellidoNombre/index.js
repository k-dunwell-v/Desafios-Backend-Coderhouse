
  class Usuario {
    constructor(nombre, apellido, libros, mascotas){
		this.nombre = nombre;
		this.apellido = apellido;
		this.libros = libros;
		this.mascotas = mascotas.split(", ");
    }

    getFullName() {
     	return `Nombre completo: ${this.nombre} ${this.apellido}`
    }

    addMascota(nombre) {
		this.mascotas.push(nombre)
		console.warn(`${nombre} ha sido añadid@ a las mascotas de ${this.nombre}`)
    }

    countMascotas() {
      	return `Cantidad de mascotas: ${this.mascotas.length}`
    }

    addBook(nombre, autor) {
		let book = {nombre:nombre, autor:autor}
		this.libros.push(book)
		console.warn(`"${nombre}" de ${autor} ha sido añadido a los libros de ${this.nombre}`)
    }

    getBookNames() {
		
		let list = `Libros:`

    for (let i in this.libros) {
			let book = this.libros[i]
			let title = book["nombre"]
			list = `${list}\n• "${title}".`
		}

		return list
    }
  
  }

  const under = "__________________________________"
  const librero = [{nombre:"Män som hatar kvinnor", autor: "Stieg Larsson"}, {nombre:"Flickan som lekte med elden", autor: "Stieg Larsson"}]
  const cliente = new Usuario("Mikkel", "Darkwest", librero, "Zar, Oslo")

  const log = `${cliente.getFullName()}\n\n${cliente.countMascotas()}\n\n${cliente.getBookNames()}\n${under}\n`

  console.log(log)

  cliente.addBook("Luftslottet som sprängdes", "Stieg Larsson")

  console.log(`\n${under}\n`)

  cliente.addMascota("Tundra")

  console.log(`\n${under}\n`)

  console.log(log)
  