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

    //artillery quick --count 50 -n 50 http://localhost:8080/api/info > 14-Loggers/profiling/result_nolog.txt
    // node --prof-process 14-Loggers/profiling/nolog-v8.log > 14-Loggers/profiling/result_nolog.txt

})

router.get('/infolog', (req, res) => {
    const os = require("os")

    const info = {
        argumentosDeEntrada: process.argv.slice(2),
        plataforma: process.platform,
        versionNode: process.versions['node'],
        memoriaTotalReservada: process.memoryUsage()['rss'],
        exPath: process.argv[1],
        processID: process.pid,
        carpetaProyecto: process.cwd(),
        Procesadores: os.cpus().length
    }

    console.log(info)

    res.json(info)

    //artillery quick --count 50 -n 50 http://localhost:8080/api/info > 14-Loggers/profiling/result_log.txt
    // node --prof-process 14-Loggers/profiling/log-v8.log > 14-Loggers/profiling/result_log.txt

})

module.exports = router