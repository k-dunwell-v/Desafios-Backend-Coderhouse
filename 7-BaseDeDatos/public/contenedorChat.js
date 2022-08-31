const { optionsLite } = require('../SQlite3DB/connectDB')
const knex = require('knex') (optionsLite)

class Contenedor {
    constructor(db){
		this.db = db;
    }

    async createTable() {
        try {
            await knex.schema.createTable(this.db, table => {
                table.timestamp('date').defaultTo(knex.fn.now());
                table.string('email')
                table.string('message')
            })

        }catch (err) {
            console.log(err); throw err
        }
    }

	async add(msg) {
        try {
            await knex(this.db).insert(msg)
        }catch (err) {
            if (err['code'] === 'ER_NO_SUCH_TABLE') {
                this.createTable()
                await knex(this.db).insert(msg)
            }else{
                throw err
            }
        }

	}

	async get(id) {
        return knex(this.db).select('*')
   
	}
	
}

module.exports = Contenedor