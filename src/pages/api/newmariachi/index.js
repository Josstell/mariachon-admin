import { firebaseConfig } from '@firebase/index'
import { dbAdmin } from '@firebase/admin/index'

import { authMiddleware } from '@helpers/lib/auth-middleware'
import slugify from 'slugify'

const createMariachi = (newMariachi) => {
  const mariachi = dbAdmin
    .collection('mariachis')
    .orderBy('createdAt', 'desc')
    .where('coordinatorId', '==', newMariachi.coordinatorId)
    .get()
    .then((docu) => {
      const mariachis = []
      docu.forEach((doc) => {
        mariachis.push(doc.data())
      })

      if (mariachis.length > 0) {
        return { error: 'Coordinator already exist' }
      }
      return dbAdmin
        .collection('mariachis')
        .add(newMariachi)
        .then((doc) => {
          const resMariachi = newMariachi
          resMariachi.mariachiId = doc.id
          dbAdmin
            .doc(`/mariachis/${resMariachi.mariachiId}`)
            .set(resMariachi)
            .catch(() => {
              const er = { error: 'Something went wrong' }
              return er
            })
          return resMariachi
        })
        .catch(() => {
          const er = { error: 'Something went wrong' }
          return er
        })
    })

  return mariachi
}

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Method not allowed' })
  }

  const noImg = 'mariachi_no_image.jpeg'

  const newMariachi = {
    name: req.body.name,
    description: req.body.description,
    service_price: req.body.service_price,
    images: req.body.images,
    videos: req.body.videos,
    members: [req.body.coordinatorId],
    coordinatorId: req.user.userId,
    coordinatorUserName: req.user.userName,
    enable: false,
    slug: slugify(req.body.name.toLowerCase()),
    imageLogo: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${noImg}?alt=media`,
    createdAt: new Date().toISOString(),
    createdBy: req.user.fullName,
  }

  if (req.method === 'POST') {
    let mariachiData
    const { role } = req.user
    switch (role) {
      case 'coordinator':
        //   return res.json(newReservation)
        mariachiData = await createMariachi(newMariachi)
        return res.status(201).json(mariachiData)
      case 'admin':
        if (req.body.coordinatorId) {
          newMariachi.coordinatorId = req.body.coordinatorId
          newMariachi.coordinatorUserName = req.body.userName
            ? req.body.userName
            : 'mariachiloco'
        }
        mariachiData = await createMariachi(newMariachi)
        return res.status(201).json(mariachiData)
      default:
        return res
          .status(400)
          .json({ error: 'You have not autorization to create a mariachi' })
    }
  }
}

module.exports = authMiddleware(handler)
