import { auth, firebaseConfig } from '@firebase/index'
import { dbAdmin } from '@firebase/admin/index'

import { isEmpty, isEmail } from '@helpers/apis'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Method not allowed' })
  }
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    userName: req.body.userName,
    role: req.body.role,
  }

  const errors = {}

  if (isEmpty(newUser.email)) {
    errors.email = 'Must not be empty'
  } else if (!isEmail(newUser.email)) {
    errors.email = 'Must be a valid email address'
  }

  if (isEmpty(newUser.password)) {
    errors.password = 'Must not be empty'
  }

  if (newUser.password !== newUser.confirmPassword) {
    errors.confirmPassword = 'Password must match'
  }

  if (Object.keys(errors).length > 0) return res.status(400).json(errors)

  if (req.method === 'POST') {
    const noImg = 'no-image.png'
    let token
    let userId
    auth
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((data) => {
        userId = data.user.uid
        return data.user.getIdToken()
      })
      .then((idToken) => {
        token = idToken
        const userCredentials = {
          state: '',
          role: newUser.role,
          mariachiId: 'Mariachi Loco',
          instrument: req.body.admin ? req.body.instrument : '',
          fullName: req.body.admin ? req.body.fullName : '',
          phone: req.body.admin ? req.body.phone : '',
          userName: newUser.userName,
          email: newUser.email,
          enable: true,
          createdAt: new Date().toISOString(),
          position: {
            latitude: '',
            longitude: '',
          },
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${noImg}?alt=media`,
          userId,
        }
        dbAdmin.doc(`/users/${userId}`).set(userCredentials)
      })
      .then(() => res.status(201).json({ token, userId }))
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          return res.status(400).json({ email: 'Email is already in use' })
        }
        return res
          .status(500)
          .json({ general: 'Something went wrong, please try again' })
      })
  }
}

export default handler
