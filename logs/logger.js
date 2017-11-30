const fs = require('fs')

let logsFile = __dirname + '/logs.txt'

module.exports = {
    async createLogs() {
        if (!fs.existsSync(logsFile))
            await fs.writeFile(logsFile, '')
    },
    openLogs() {
        return new Promise(resolve => {
            fs.readFile(logsFile, 'utf-8', (err, data) => {
                if (err) throw err
                if (data)
                    return resolve(JSON.parse(data))
                resolve([])
            })
        })
    },
    updateLogs(logs, newLog) {
        return new Promise(resolve => {
            console.log('Updating logs...')
            logs.push(newLog)
            fs.writeFile(logsDirectory, JSON.stringify(logs), 'utf-8', (err) => {
                if (err) throw err
                resolve('Logs updated')
            })
        })
    }
}