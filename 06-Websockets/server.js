const express = require("express")
const { Server:HttpServer } = require("http")
const { Server:ServerIo } = require("socket.io")

const app = express()
const httpServer = new HttpServer(app)
const io = new ServerIo(httpServer)

const PORT = process.env.PORT || 8080

app.set("view engine", "pug")
app.set("views", "./views")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

//////////////////////////////////////////////////////
///////////////////////////////////////////////////////

const { Router } = express
const router = Router()
const fs = require("fs")


router.get("/", (req, res) => {
    res.render("index", {form:true})

})

router.get("/productos", (req, res) => {
    fs.readFile("./productos.txt", "utf-8", (err, products) => {
        
        if (err) {
            res.send("No puedo, toy chikito :(")
        }else{
            res.render("index", {form:false, products:JSON.parse(products)})
        }
    })
})


//////////////////////////////////////////////////////
////////////////////////CLIENTE///////////////////////
//////////////////////////////////////////////////////

io.on('connection', (socket) => {
    console.log('Unknown bunny connected')

    fs.readFile("./productos.txt", "utf-8", (err, products) => {
        
        if (err) {
            fs.writeFileSync("./productos.txt", "[]")
        }else{
            socket.emit('connection', {"products": JSON.parse(products)})
        }
    })

    fs.readFile("./chat.txt", "utf-8", (err, messages) => {
        if (err) {
            fs.writeFileSync("./chat.txt", "[]")

        }else{
            socket.emit('connection', {"messages":JSON.parse(messages)})
        }
    })

    // NUEVOS PRODUCTOS
    socket.on('postProduct', (product) => {

        fs.readFile("./productos.txt", "utf-8", (err, products) => {
        
            if (err) {
                product["id"] = 1
                const newText = JSON.stringify([product])
                fs.writeFileSync("./productos.txt", newText)
    
            }else{
                const dataParsed = JSON.parse(products)
                product["id"] = dataParsed.length + 1
                dataParsed.push(product)
    
                const newText = JSON.stringify(dataParsed)
                fs.writeFileSync("./productos.txt", newText)
            }
    
        })
        
        io.emit('postProduct', product)
    })

    // NUEVOS MENSAJES DEL CHAT
    socket.on('chatter', (message) => {

        fs.readFile("./chat.txt", "utf-8", (err, messages) => {
        
            if (err) {
			    fs.writeFileSync("./chat.txt", JSON.stringify([message]))

            }else{
                const dataParsed = JSON.parse(messages)
                dataParsed.push(message)
                fs.writeFileSync("./chat.txt", JSON.stringify(dataParsed))
            }
        })
        
        io.emit('chatter', message)
    })
})


//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////


router.get("/productos/:id", (req, res) => {
    const { id } = req.params

    fs.readFile("./productos.txt", "utf-8", (err, products) => {
        
        if (err) {
            res.send("No puedo, toy chikito :(")
        }else{
			const dataParsed = JSON.parse(products)
			const getProduct = dataParsed.findIndex((product => product["id"] === parseInt(id)))
			res.send(dataParsed[getProduct] || "El ID ingresado no existe.")
        }
    })
})

router.put("/productos/:id", (req, res) => {
    const { id } = req.params
    const {title, price, thumbnail} = req.body

    fs.readFile("./productos.txt", "utf-8", (err, products) => {
        
        if (err) {
            res.send("No puedo, toy chikito :(")
        }else{
            const dataParsed = JSON.parse(products)
			const getProduct = dataParsed.findIndex((product => product["id"] === parseInt(id)))

			if (getProduct > -1) {
				
                const product = dataParsed[getProduct]

                if (title) {
                    product ["title"] = title
                }

                if (price) {
                    product ["price"] = price
                }

                if (thumbnail) {
                    product ["thumbnail"] = thumbnail
                }

                dataParsed.push(product)
				const newText = JSON.stringify(dataParsed)
				fs.writeFileSync("../productos.txt", newText)

				res.send("Producto actualizado")

			}else{
				res.send("El ID ingresado no existe.")
			}
        }
    })
    
})

router.delete("/productos/:id", (req, res) => {
    const { id } = req.params

    fs.readFile("./productos.txt", "utf-8", (err, products) => {
        
        if (err) {
            res.send("No puedo, toy chikito :(")
        }else{
            const dataParsed = JSON.parse(products)
			const getProduct = dataParsed.findIndex((product => product["id"] === parseInt(id)))

			if (getProduct > -1) {
				dataParsed.splice(getProduct, 1)

				const newText = JSON.stringify(dataParsed)
				fs.writeFileSync("../productos.txt", newText)

				res.send("Producto eliminado")

			}else{
				res.send("El ID ingresado no existe.")
			}
        }
    })
})


//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

app.use("/", router)

httpServer.listen(PORT, err => {
    if (err) throw err
    console.log("Server running on port 8080")
})