`
Реализовать скрипт request для тестирования веб сервера
Создать локальный веб сервер 'server', отвечающий на запросы каждые 100ms

Создать скрипт 'request', принимающий на вход 
- количество запросов 'N'
- тип запросов - параллельный или последовательный

Скрипт 'request' должен отправлять 'N' последовательных или параллельных 'HTTP' 
запросов к локальному серверу 'server'
`
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

let i = 0
const server = http.createServer((req, res) => {
    setTimeout(()=>{
        console.log(++i)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('');
    }, 100)
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});