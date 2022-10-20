const express = require('express')
const { fork } = require('child_process')
const router = express.Router()

router.get('/randoms/', (req, res) => {
    const qty = req.query.cant || 100000000

    const forked = fork('public/fork.js')
    forked.send(qty)

    forked.on('message', (message) => {
        res.json(message)
    })

})

module.exports = router;