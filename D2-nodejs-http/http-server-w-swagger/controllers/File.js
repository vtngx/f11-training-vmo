const utils = require('../utils/writer.js')
const File = require('../service/FileService')

const createFile = (req, res, next) => {
  let data
  File.createFile()
    .then(res => data = res ? "Success" : "Fail")
    .catch(() => data = "Fail")
    .finally(() => utils.writeJson(res, { data }))
}

const deleteFile = (req, res, next) => {
  let data
  File.deleteFile()
    .then(res => data = res ? "Success" : "Fail")
    .catch(() => data = "Fail")
    .finally(() => utils.writeJson(res, { data }))
}

const getAbsolutePath = (req, res, next) => {
  const data = File.getAbsolutePath()
  utils.writeJson(res, { data })
}

module.exports = {
  createFile,
  deleteFile,
  getAbsolutePath,
}