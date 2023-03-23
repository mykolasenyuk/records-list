const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const authentication = require('./middlewares/authentication')

const recordsRouter = require('./routes/api/records')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(authentication)

app.use('/api/records', recordsRouter)

app.use((req, res) => {c§§
  res.status(404).json({
    status: 'error',
    message: 'Not  Found',
  })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message })
})

module.exports = app
