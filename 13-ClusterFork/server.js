const http = require('http')

const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs.default({
    port: 8080,
    mode: "fork"
}).argv

// httpServer.listen(args.port, err => {
//     if (err) throw err
//     console.log(`Server running on port ${args.port}`)
// })

const cluster = require("cluster")
const os = require("os")
const cpus = os.cpus().length

if (args.mode === "fork") {
    // httpServer.listen(args.port, () => {
    //     console.log(`Server running on port ${args.port}, mode: FORK`)
    // })
    http.createServer((req, res) => {
        res.writeHead(200)
    }).listen(args.port)

    console.log(`Server running on port ${args.port}, mode: FORK`)
    
}else if (args.mode === "cluster") {
    if (cluster.isMaster) {
        console.log(`Primary process: ${process.pid} is running`)
        for (let i = 0; i < cpus; i++) {
            cluster.fork()
        }

        cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died`)
        })

    } else {
        http.createServer((req, res) => {
            res.writeHead(200)
        }).listen(args.port)
        
        console.log(`Worker ${process.pid} started`)
    
    }
}