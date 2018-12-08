/**
 * Создать локальный веб сервер 'server', отвечающий на запросы каждые 100ms
 */

const http = require('http')
const HOST = '127.0.0.1'
const PORT = 3000
const TIMEOUT = 100
const STATUS_OK = 200

let i = 0
const server = http.createServer((req, res) => {
    setTimeout(() => {
        console.log(++i)
        res.statusCode = STATUS_OK
        res.end()
    }, TIMEOUT)
});

server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`)
});