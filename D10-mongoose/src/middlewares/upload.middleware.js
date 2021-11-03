const multer = require('multer')
const path = require('path')

const upload = multer({ 
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = `${__dirname}/../_public/uploads`
      cb(null, dir)
    },
    filename: (req, file, cb) => {
      const filename = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      cb(null, filename)
    }
  })
})

module.exports = {
  uploadSingle: upload.single('image'),
  uploadMulti: upload.array('images')
}