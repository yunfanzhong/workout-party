require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const users = require('./routes/users')

const { MONGO_URI, PORT } = process.env

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('open', () => console.log(`MongoDB connection open! 🚀`))
mongoose.connection.on('error', (err) =>
  console.log(`Error connecting to MongoDB: ${err}`)
)

const app = express()

app.use('/users', users)

app.get('/', (_req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))
