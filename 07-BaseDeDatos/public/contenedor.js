const { options } = require('../mariaDB/connectDB')
const knex = require('knex') (options)

class Contenedor {
    constructor(db){
		this.db = db;
    }

    async createTable() {
        try {
            await knex.schema.createTable(this.db, table => {
                table.timestamp('timestamp').defaultTo(knex.fn.now());
                table.increments('id')
                table.string('title')
                table.string('thumbnail')
                table.string('detail')
                table.integer('price')
                table.integer('stock')
            })
        }catch (err) {
            console.log(err); throw err
        }
    }

	//add(DataBase, Object): Number - Recibe un objeto, lo guarda en el archivo.
	async add(product) {
        try {
            await knex(this.db).insert(product)
        }catch (err) {
            if (err['code'] === 'ER_NO_SUCH_TABLE') {
                this.createTable()
                await knex(this.db).insert(product)
            }else{
                throw err
            }
        }

	}

    //get(Number(optional)): Object[] - Devuelve un array con los objeto(s) presentes en el archivo (según ID)).
	async get(id) {
            
        if (id) {
            return knex(this.db).select('*').where('id', '=', id)
        }else{
            return knex(this.db).select('*')
        }
   
	}

	//delete(Number(optional)): void - Elimina uno (según ID) o todos los objetos del archivo.
 	async delete(id) {
        if (id) {
            return knex(this.db).where('id', '=', id).del()
        }else{
            return knex(this.db).del()
        }
	}
	
}

module.exports = Contenedor