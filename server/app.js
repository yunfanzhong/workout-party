require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')

const workoutRouter = require('./routes/workouts')
const userRouter = require('./routes/users')
const facebookRouter = require('./routes/facebook')
const workoutPartyRouter = require('./routes/workoutParty')

const { MONGO_URI, PORT } = process.env

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('open', () => console.log(`MongoDB connection open! 🚀`))
mongoose.connection.on('error', (err) =>
  console.log(`Error connecting to MongoDB: ${err}`)
)

// Remove deprecation warning
mongoose.set('useCreateIndex', true)

const app = express()

// Parse request bodies into json
app.use(bodyParser.json())

app.use('/workouts', workoutRouter)
app.use('/users', userRouter)
app.use('/facebook', facebookRouter)
app.use('/workoutParty', workoutPartyRouter)

app.get('/', (_req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))
