require('dotenv').config()
const cors = require("cors")
const express = require("express")
const db = require("./models")
const router = require('./routes')
const logger = require('./middlewares/logger.middleware')
const errorHandler = require('./middlewares/error.middleware')

const PORT = process.env.PORT || 8080
const NODE_ENV = process.env.NODE_ENV

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// logger middleware
app.use(logger)

//  use routers
router(app)

// error handling middleware
app.use(errorHandler)

//  init database & server
db.sequelize
  .sync({
    force: NODE_ENV === "CLEAN",
  })
  .then(r => {
    NODE_ENV === "CLEAN" && console.log("> Start server in FORCE mode")

    console.log(`> Database ${r.config.database} connected on port ${r.config.port}`)
    
    NODE_ENV === "CLEAN" && require("./_scripts/seeding")()
      .then(() => {
        console.log('> Data seeded successfully')
      })
    
    app.listen(PORT, () => {
      console.log(`> Server online on port ${PORT}`)
    })
  })

  module.exports = app