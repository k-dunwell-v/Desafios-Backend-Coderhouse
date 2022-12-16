# Desafios-Backend-Coderhouse
Cada carpeta contiene el presentable para cada desafío.

## 3-ServidorExpress
Link a Glitch --> https://nettle-private-countess.glitch.me

## 5-Plantillas
Después de haber utilizado tres motores de plantillas diferentes para llevar a cabo el mismo proyecto, me gustaría continuar trabajando con pug, pues opino que es el más práctico de los tres. Es fácil de entender, utiliza menos líneas, y de momento no me encontré con ninguna diferencia a la hora de escribir JS, como sí sucedió con Handlebars (no acepta el operador "||", entre otros).

## 7-BaseDeDatos
En la carpeta "coder" ya está creada una tabla que contiene más de 10 productos. Para usar, poner en la ruta "\xampp\mysql\data".

## 8-MongoDB
La carpeta "db" debe ir en la ruta C:\data.

## 15-Heroku
Link a servidor --> https://coder-backend-keith.herokuapp.com/api/

## 18-Test
Para iniciar servidor --> Desde la carpeta server, `$ npm start`<br/>
Para iniciar cliente --> Desde la carpeta client, `$ npm start`<br/>
Para realizar test con mocha, chai y supertest --> Desde la carpeta server, `$ npm run test`<br/>

## 19-GRAPHQL
Iniciar servidor con `$ npm start` e ir a --> http://localhost:8080/graphql

### Comandos
query {
    getProducts {
        _id
        title
        thumbnail
        detail
        price
        stock
    }
}

query {
	getProductById(_id:"633f6f1317b4338f2bbdaff5") {
        _id
        title
        thumbnail
        detail
        price
        stock
	}
}

mutation {
    postProduct (
        title: "Goose"
        thumbnail: ""
        detail: "Qwack"
        price: 1
        stock: 1
    ) { _id }
}

mutation {
    putProduct (
      	_id:"639bb5b8ff2ca3bb4b612eb4"
        title: "GooseEditado"
        thumbnail: ""
        detail: "Qwack"
        price: 1
        stock: 1
    ) { title, thumbnail, detail, price, stock }
}

mutation {
    deleteProduct ( 
        _id:"639bb5b8ff2ca3bb4b612eb4" 
    ) { acknowledged, deletedCount }
}
