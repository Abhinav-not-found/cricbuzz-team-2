    const pino = require('pino')
    const env = require('./env')

    module.exports = pino({
        level: env.LOGGER_LEVEL,
        transport: {
            target: 'pino-pretty'
        },
    })
