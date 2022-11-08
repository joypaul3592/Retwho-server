const fs = require("fs")
const cloudinary = require('cloudinary')


const uploadToCloudinary = async (locaFilePath, folder) => {
  const filePathOnCloudinary = folder + "/" + locaFilePath

  return cloudinary.uploader
    .upload(locaFilePath, { public_id: filePathOnCloudinary })
    .then((result) => {

      fs.unlinkSync(locaFilePath)

      return result.url
    })
    .catch((error) => {
      console.log(error)
      if (fs.existsSync(locaFilePath)) fs.unlinkSync(locaFilePath)
    })
}

module.exports = {
  uploadToCloudinary
}