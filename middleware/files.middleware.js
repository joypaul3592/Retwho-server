const multer = require('multer')
const fs = require("fs")
const { getRandomString } = require('../utils/helpers')
const { AllowedFileTypes, maxFileSize } = require('../utils/constants')

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads")
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads")
  },
  filename: function (req, file, cb) {
    const newFIleName = `${getRandomString()}-${file.originalname}`
    cb(null, newFIleName)
  },
})
  
const upload = multer({ 
  storage: storage,
  limits: {fileSize: maxFileSize},
  fileFilter: (req, file, cb) => {
    if (!AllowedFileTypes.has(file.mimetype)) {
      cb(null, false)
    }
    cb(null, true)
  }
})

module.exports = {
  upload
}