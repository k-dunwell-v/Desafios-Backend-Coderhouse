const { httpServer } = require('./app')
const { logger } = require('./logs/logger')

const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs.default({
    port: 8080,
    mode: "fork"
}).argv


const cluster = require("cluster")
const os = require("os")
const cpus = os.cpus().length

if (args.mode === "fork") {
    httpServer.listen(args.port, () => {
        logger.info(`Server running on port ${args.port}, mode: FORK`)
    })
    
}else if (args.mode === "cluster") {
    if (cluster.isMaster) {
        logger.info(`Primary process: ${process.pid} is running`)
        for (let i = 0; i < cpus; i++) {
            cluster.fork()
        }

        cluster.on("exit", (worker) => {
            logger.info(`Worker ${worker.process.pid} died`)
        })

    } else {
        httpServer.listen(args.port, err => {
            if (err) throw err
            logger.info(`Worker ${process.pid} started`)
        })

    }
}


