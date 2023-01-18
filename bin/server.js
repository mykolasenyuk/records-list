const mongoose = require('mongoose')
require('dotenv').config()

const app = require('../app')
const { DB_HOST, PORT = 3000 } = process.env

mongoose.set('strictQuery', false)
mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin',
  })
  .then(() => {
    app.listen(PORT)
    console.log(`Database connection successful on Port ${PORT}`)
  })
  .catch((error) => {
    console.log(error.message)
    process.exit(1)
  })
