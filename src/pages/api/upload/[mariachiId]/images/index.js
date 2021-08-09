import { authMiddleware } from '@helpers/lib/auth-middleware'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Method not allowed' })
  }

  if (req.method === 'POST') {
    const {
      query: { mariachiId, option },
    } = req

    const mariachiData = {}
    // mariachiData.images = req

    return res.status(201).json({ mariachiId, option, mariachiData })
    // let busboy = new Busboy({ headers: req.headers })
    // let imageToBeUploaded = {}
    // let imageFileName
    // // String for image token
    // let generatedToken = uuid()
    // busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {

    //     console.log(fieldname, file, filename, encoding, mimetype)
    //     if (mimetype !== "image/jpg" && mimetype !== "image/jpeg" && mimetype !== "image/png") {
    //         return res.status(400).json({ error: "Wrong file type submitted" })
    //     }
    //     // my.image.png => ['my', 'image', 'png']
    //     const imageExtension = filename.split(".")[filename.split(".").length - 1]
    //     // 32756238461724837.png
    //     imageFileName = `${Math.round(
    //         Math.random() * 1000000000000
    //     ).toString()}.${imageExtension}`
    //     console.log(path.join(os.tmpdir()))
    //     const filepath = path.join(os.tmpdir(), imageFileName)
    //     imageToBeUploaded = { filepath, mimetype }
    //     file.pipe(fs.createWriteStream(filepath))
    // })

    // busboy.on("finish", function () {

    //     storage
    //         .bucket()
    //         .upload(imageToBeUploaded.filepath, {
    //             resumable: false,
    //             metadata: {
    //                 metadata: {
    //                     contentType: imageToBeUploaded.mimetype,
    //                     //Generate token to be appended to imageUrl
    //                     firebaseStorageDownloadTokens: generatedToken,
    //                 },
    //             },
    //         })
    //         .then(() => {
    //             // Append token to url
    //             const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`
    //             return dbAdmin.doc(`/users/${req.user.userId}`).update({ imageUrl })
    //         })
    //         .then(() => {
    //             return res.json({ message: "image uploaded successfully" })
    //         })
    //         .catch(err => {
    //             console.error(err)
    //             return res.status(500).json({ error: "something went wrong" })
    //         })
    // })
    // return req.pipe(busboy)
  }
}

export default authMiddleware(handler)
