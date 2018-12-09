const fs = require('fs')
const path = require('path')

function run() {
    const args = process.argv.slice(2)
    const filepath = args[0] ? args[0] : __dirname
    tree(filepath).then(console.log)
}

async function tree(filepath) {
    let files = []
    let dirs = []
    if (await isDirectory(filepath)) {
        dirs.push(filepath)
        await readDirectory(filepath)
            .then(async filenames => {
                await Promise.all(filenames.map(file => tree(path.join(filepath, file))))
                    .then(contents => {
                        for (let content of contents) {
                            if (content.dirs.length)
                                dirs = dirs.concat(content.dirs)
                            if (content.files.length)
                                files = files.concat(content.files)
                        }
                    })
            })
    } else
        files.push(filepath)
    return {
        files,
        dirs
    }
}

function readDirectory(filepath) {
    return new Promise((resolve, reject) => fs.readdir(filepath, (err, files) => {
        if (err)
            reject(err)
        else
            resolve(files)
    }))
}

function isDirectory(filepath) {
    return new Promise((resolve, reject) => {
        fs.lstat(filepath, (e, stat) => {
            if (e)
                reject(e)
            else
                resolve(stat.isDirectory())
        })
    })
}

run()