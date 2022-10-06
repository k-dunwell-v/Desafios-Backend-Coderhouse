const express = require("express")
const app = express()

const PORT = process.env.PORT || 8080

app.set("view engine", "pug")
app.set("views", "./views")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("../public"))

//////////////////////////////////////////////////////
///////////////////////////////////////////////////////

const { Router } = express
const router = Router()
const fs = require("fs")


router.get("/", (req, res) => {
    res.render("index", {form:true})

})

router.get("/productos", (req, res) => {
    fs.readFile("../productos.txt", "utf-8", (err, products) => {
        
        if (err) {
            res.send("No puedo, toy chikito :(")
        }else{
            res.render("index", {form:false, products:JSON.parse(products)})
        }
    })
})

router.post("/productos", (req, res) => {
    const {title, price, thumbnail} = req.body

    fs.readFile("../productos.txt", "utf-8", (err, products) => {
        
        if (err) {
            res.send("No puedo, toy chikito :(")
        }else{
			const dataParsed = JSON.parse(products)
            const product = {"title": title, "price": parseInt(price), "thumbnail": thumbnail, "id": dataParsed.length + 1}
			dataParsed.push(product)

			const newText = JSON.stringify(dataParsed)
			fs.writeFileSync("../productos.txt", newText)

            res.redirect(301, "/")
        }
    })
})

router.get("/productos/:id", (req, res) => {
    const { id } = req.params

    fs.readFile("../productos.txt", "utf-8", (err, products) => {
        
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

    fs.readFile("../productos.txt", "utf-8", (err, products) => {
        
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

    fs.readFile("../productos.txt", "utf-8", (err, products) => {
        
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

app.listen(PORT, err => {
    if (err) throw err
    console.log("Server running on port 8080")
})