const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors')
const hpp = require('hpp')
const rateLimit = require('express-rate-limit')
const cookieParser = require('cookie-parser')
const env = require('../config/env')


function securityMiddleware(app) {
    app.use(express.json({ limit: '3mb' }))
    app.use(express.urlencoded({
        extended: true,
        limit: '3mb'
    }))
    app.use(helmet())
    app.use(compression())
    app.use(hpp())
    app.use(rateLimit({
        windowMs: env.RATELIMIT_WINDOWMS,
        limit: env.RATELIMIT,
        legacyHeaders: true,
        message: 'Too many requests try after some time'
    }))

    app.use(cors({
        origin: env.CORS_ORIGIN.split(',').map(origin => origin.trim()),
        credentials: true
    }))
    app.use(cookieParser())
}

module.exports = securityMiddleware
