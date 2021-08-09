import { firebaseConfig } from '@firebase/index'
import { dbAdmin } from '@firebase/admin/index'

import { authMiddleware } from '@helpers/lib/auth-middleware'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Method not allowed' })
  }
  const newUser = {
    email: req.body.email,
    userName: req.body.fullName,
    fullName: req.body.fullName,
    phone: req.body.phone,
    role: req.body.role,
  }

  if (req.method === 'POST') {
    const noImg = 'no-image.png'
    let user = {}

    if (newUser.role !== 'clientNotEmail') {
      return res.status(400).json({ error: 'role not allowed' })
    }

    const userCredentials = {
      createdAt: new Date().toISOString(),
      email: newUser.email,
      emailToSendReservation: newUser.email,
      imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${noImg}?alt=media`,
      fullName: req.body.fullName,
      phone: req.body.phone,
      role: newUser.role,
      userName: newUser.fullName,
      enable: true,
      position: {
        latitude: '',
        longitude: '',
      },
    }
    dbAdmin
      .collection('users')
      .add(userCredentials)
      .then((doc) => {
        user = userCredentials
        user.userId = doc.id
        dbAdmin.doc(`/users/${user.userId}`).set(user)
      })
      .then(() => res.status(201).json(user))
      .catch((err) => {
        res.status(500).json({ error: err })
      })
  }
}

export default authMiddleware(handler)
