/**
 * Создать скрипт 'request', принимающий на вход:
 * - количество запросов 'N',
 * - тип запросов - параллельный или последовательный.
 * Скрипт 'request' должен отправлять 'N' последовательных или параллельных 'HTTP' 
 * запросов к локальному серверу 'server'
 */

const http = require('http')
const HOST = '127.0.0.1';
const PORT = 3000;
let OPTIONS = {
    host: HOST,
    port: PORT
}
const MESSAGE_NO_ARGS = 'No arguments were provided. You should pass number of requests as first argument at least!'

function run() {
    const args = process.argv.slice(2)
    if (args.length < 1) {
        console.warn(MESSAGE_NO_ARGS)
        return
    }
    const reqs = new Array(parseInt(args[0])).fill(0)

    if (args[1] == 'async')
        Promise.all(reqs.map(makeRequest)).then()
    else
        reqs.reduce((accumulator, currentValue) => {
            return accumulator.then(makeRequest)
        }, Promise.resolve())
}

function makeRequest() {
    return new Promise((resolve, reject) => {
        http.get(OPTIONS, response => {
            let data = ''
            let headers = response.headers
            response.on('data', (d) => {
                data += d
            })
            response.on('end', () => resolve({
                data,
                headers
            }))
        }).on('error', reject)
    })
}

run()