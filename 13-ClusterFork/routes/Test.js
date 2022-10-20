const express = require('express')
const router = express.Router()

const { faker } = require('@faker-js/faker')

faker.locale = 'es'

router.get('/productos-test', (req, res) => {
    const dummies = []

    for (let i = 0; i < 10; i++) {

        const dummy = {
            title: faker.commerce.productName(),
            thumbnail: faker.image.animals(600, 722, true),
            price: faker.commerce.price(1, 100, 0),
        }

        dummies.push(dummy)
    }

    console.log(dummies)

    res.render("test", {form:false, products:dummies})
})

router.get('/info', (req, res) => {
    const os = require("os")

    res.json({
        argumentosDeEntrada: process.argv.slice(2),
        plataforma: process.platform,
        versionNode: process.versions['node'],
        memoriaTotalReservada: process.memoryUsage()['rss'],
        exPath: process.argv[1],
        processID: process.pid,
        carpetaProyecto: process.cwd(),
        Procesadores: os.cpus().length
    })
})
module.exports = router