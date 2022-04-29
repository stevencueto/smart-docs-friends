require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()
const jtw = require('jsonwebtoken')
const cors = require('cors')





app.use(cors())


const PORT = process.env.PORT || 3004;

// ___________________
// Database
// ___________________
const mongoURI = process.env.MONGO_URI

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true},
  () => console.log('MongoDB connection established:', mongoURI)
)

// Error / Disconnection
const db = mongoose.connection
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected', mongoURI))


app.use(morgan('dev'))


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//require router

const secureServer = require('./middleware/jwt')
const friendsRouter = require('./controlers/friendsController')
const microRouter = require('./controlers/MicroservicesController')
app.use('/', secureServer)
app.use('/friend', friendsRouter)
app.use('/micro', microRouter)











app.listen(PORT, ()=>{
    console.log(`Listening on PORT: ${PORT}`)
})
