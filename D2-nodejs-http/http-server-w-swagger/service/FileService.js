const fs = require('fs')
const path = require('path')

/**
 * 3.2
 *
 * Create file "files/file-test.txt"
 **/
const createFile = async () => {
  const _dir = './files/'
  const _file = 'file-test.txt'
  
  try {
    if (!fs.existsSync(_dir))
      await fs.mkdirSync(_dir, { recursive: true })
  
    await fs.writeFileSync(`${_dir}${_file}`, "")

    return true
  } catch (e) {
    return false
  }
}

/**
 * 3.3
 *
 * Delete file "files/file-test.txt"
 **/
const deleteFile = async () => {
  const _dir = './files/'
  const _file = 'file-test.txt'
  const filepath = `${_dir}${_file}`
  
  if (!fs.existsSync(filepath)) {
    return false
  }

  try {
    await fs.unlinkSync(filepath)
    return true
  } catch (e) {
    return false
  }
}

/**
 * 3.4
 *
 * Get absolute path of "files/file-test.txt"
 **/
const getAbsolutePath = () => {
  const _file = './files/file-test.txt'
  return path.resolve(_file)
}

module.exports = {
  createFile,
  deleteFile,
  getAbsolutePath,
}