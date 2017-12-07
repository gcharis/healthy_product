const Log = require('../database/models/Log.js')

module.exports = {
    updateLogs(log) {
        return new Promise(resolve => {
            let newLog = new Log(log)
            newLog.save((err, log) => {
                if (err) throw err
                resolve(log)
            })
        })
    }
}