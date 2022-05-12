const express = require('express')
const cors = require('cors')
const path = require('path')

const questionsRouter = require('./api/questions/questions-router')
const authRouter = require('./api/auth/auth-router')

const server = express()
server.use(express.json())
server.use(express.static(path.join(__dirname, '../dist')))
server.use(cors())

server.use('/api/questions', questionsRouter)
server.use('/api/auth', authRouter)

// SPA
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})
// 404
server.use((req, res) => {
  res.status(404).json({
    message: `Endpoint [${req.method}] ${req.originalUrl} does not exist`,
  })
})
// ERR
server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    error: 'The app crashed for some reason, see message & stack',
    message: err.message,
    stack: err.stack,
  })
})

module.exports = server
