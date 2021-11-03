const fs = require('fs')
require("dotenv").config()

//Load models
const User = require('./models/User')

//Connect to DB
require('./configs/db')()

//Read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
)

//Import into DB
const importData = async function () {
  try {
    await User.create(users)
    console.log('> Data Imported...')
    process.exit()
  } catch (err) {
    console.log(err)
  }
}

//Delete data
const deleteDAta = async function () {
  try {
    await User.deleteMany()
    console.log('> Data Destroyed...')
    process.exit()
  } catch (err) {
    console.log(err)
  }
}

if (process.argv[2] === '-i')
  importData()
else if (process.argv[2] === '-d')
  deleteDAta()