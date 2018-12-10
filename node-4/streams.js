const {
    Readable,
    Writable,
    Transform
} = require('stream')

    !(function () {
        const processArgs = function () {
            const args = process.argv.slice(2)
            let params = {}
            for (let arg of args) {
                let index = String(arg).indexOf('=')
                if (index > 0) {
                    params[arg.slice(0, index)] = arg.slice(index + 1)
                }
            }
            return params
        }

        let {
            readablewm,
            transformwm,
            writablewm,
            timeout
        } = processArgs()

        const readable = (function () {
            const $ = new Readable({
                highWaterMark: readablewm,
                objectMode: true,
                read() {
                    this.push(Number(Math.random()))
                }
            })
            return $
        })()

        const transform = (function () {
            let hasPlace = true
            const $ = new Transform({
                objectMode: true,
                highWaterMark: transformwm,
                transform(chunk, encoding, callback) {
                    if (hasPlace) {
                        let status = this.push(String(chunk + Math.random()))
                        if (!status) {
                            hasPlace = false
                            console.log('Buffer overflow')
                        }
                    }
                    callback()
                }
            })
            $.on('drain', () => {
                console.log('Buffer is drained')
                hasPlace = true
            })
            return $
        })()

        const writable = (function () {
            const $ = new Writable({
                highWaterMark: writablewm,
                write(chunk, encoding, callback) {
                    setTimeout(() => {
                        console.log(JSON.parse(chunk))
                        callback()
                    }, timeout)
                }
            })
            return $
        })()

        console.log(`Readable HWM is ${readable.readableHighWaterMark}`)        
        console.log(`Transform readable HWM is ${transform.readableHighWaterMark}`)
        console.log(`Transform writable HWM is ${transform.writableHighWaterMark}`)
        console.log(`Writable HWM is ${writable.writableHighWaterMark}`)
        console.log(`Timeout is ${timeout ? timeout : 0}`)
        console.log()
        readable.pipe(transform).pipe(writable)
    })()