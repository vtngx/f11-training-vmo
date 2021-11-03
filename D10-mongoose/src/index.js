require("dotenv").config()
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const express = require("express")
const router = require('./routes')
const connectDB = require('./configs/db')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const logger = require('./middlewares/logger.middleware')
const errorHandler = require('./middlewares/error.middleware')

const PORT = process.env.PORT || 8080

// connect db
connectDB()

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(mongoSanitize())
app.use(helmet())
app.use(cors())

// set static folders
app.use(express.static(path.join(__dirname, '_public')))

// logger middleware
app.use(logger)

// use routers
router(app)

// error handling middleware
app.use(errorHandler)

app.listen(PORT, () =>
  console.log('Server online on port ' + PORT)
)