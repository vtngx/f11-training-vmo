const fs = require('fs')

const deleteMultiSync = (files) => {
  files.forEach(file => {
    fs.unlinkSync(file)
  })
}

module.exports = {
  deleteMultiSync,
}