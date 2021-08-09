import { firebaseConfig } from '@firebase/index'
import { storage, dbAdmin } from '@firebase/admin/index'

import { authMiddleware } from '@helpers/lib/auth-middleware'
import { uuid } from 'uuidv4'

const path = require('path')
const fs = require('fs')
const os = require('os')
const Busboy = require('busboy')

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = async (req, res) => {
  const {
    query: { mariachiId },
  } = req

  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Method not allowed' })
  }

  if (
    req.method === 'POST' &&
    (req.user.role === 'admin' || req.user.role === 'coordinator')
  ) {
    const busboy = new Busboy({ headers: req.headers })

    let imageToBeUploaded = {}
    let imageFileName
    // String for image token
    const generatedToken = uuid()

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      if (
        mimetype !== 'image/jpg' &&
        mimetype !== 'image/jpeg' &&
        mimetype !== 'image/png'
      ) {
        return res.status(400).json({ error: 'Wrong file type submitted' })
      }
      // my.image.png => ['my', 'image', 'png']
      const imageExtension = filename.split('.')[filename.split('.').length - 1]
      // 32756238461724837.png
      imageFileName = `${Math.round(
        Math.random() * 1000000000000
      ).toString()}.${imageExtension}`
      const filepath = path.join(os.tmpdir(), imageFileName)
      imageToBeUploaded = { filepath, mimetype }
      file.pipe(fs.createWriteStream(filepath))
    })

    busboy.on('finish', () => {
      storage
        .bucket()
        .upload(imageToBeUploaded.filepath, {
          resumable: false,
          metadata: {
            metadata: {
              contentType: imageToBeUploaded.mimetype,
              // Generate token to be appended to imageUrl
              firebaseStorageDownloadTokens: generatedToken,
            },
          },
        })
        .then(() => {
          // Append token to url
          const imageLogo = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`
          return dbAdmin.doc(`/mariachis/${mariachiId}`).update({ imageLogo })
        })
        .then(() => res.json({ message: 'image uploaded successfully' }))
        .catch((err) => {
          return res.status(500).json({ error: err })
        })
    })
    return req.pipe(busboy)
  }
}

export default authMiddleware(handler)
