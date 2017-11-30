const fs = require('fs')

let logsDirectory = __dirname + '/logs.txt'

module.exports = {
    async createLogs() {
        if (!fs.existsSync(logsDirectory))
            await fs.writeFile(logsDirectory, '')
    },
    openLogs() {
        return new Promise(resolve => {
            fs.readFile(logsDirectory, 'utf-8', (err, data) => {
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