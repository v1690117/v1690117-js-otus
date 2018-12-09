const tree = require('./../tree')

function test() {
    const args = process.argv.slice(2)
    const filepath = args[0] ? args[0] : __dirname
    let message = 'done'
    tree(filepath).then(console.log)
}

test()