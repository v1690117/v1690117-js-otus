`
Создать скрипт 'request', принимающий на вход 
    - количество запросов 'N'
    - тип запросов - параллельный или последовательный
Скрипт 'request' должен отправлять 'N' последовательных или параллельных 'HTTP' 
запросов к локальному серверу 'server'
`
const http = require('http')
const host = '127.0.0.1';
const port = 3000;
let options = {
    host,
    port
}

function makeRequest() {
    return new Promise((resolve, reject) => {
        http.get(options, response => {
            let data = ''
            let headers = response.headers
            response.on('data', (d) => { data += d })
            response.on('end', () => resolve({ data, headers }))
        }).on('error', reject)
    })
}

const args = process.argv.slice(2)
const reqs = new Array(parseInt(args[0])).fill(0)

if (args[1] == 'async')
    Promise.all(reqs.map(makeRequest)).then()
else
    reqs.reduce((accumulator, currentValue) => {
        return accumulator.then(makeRequest)
    }, Promise.resolve())
