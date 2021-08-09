import { dbAdmin } from '@firebase/admin/index'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Method not allowed' })
  }

  const user = {
    userId: req.body.userId,
    email: req.body.email,
    fullName: req.body.fullName,
    userName: req.body.userName,
    imageUrl: req.body.imageUrl,
    phone: req.body.phone,
    role: req.body.role,
    providerId: req.body.providerId,
  }

  if (req.method === 'POST') {
    await dbAdmin
      .doc(`/users/${user.userId}`)
      .get()
      .then(async (userData) => {
        if (!userData.exists) {
          const userCredentials = {
            ...user,
            createdAt: new Date().toISOString(),
            phone: user.phone ? user.phone : '',
            enable: true,
          }

          await dbAdmin.doc(`/users/${user.userId}`).set(userCredentials)
          return res.status(200).json({ user: false })
        } else {
          return res.status(200).json({ user: true })
        }
      })
      .catch((err) => {
        return res.status(200).json({ err })
      })
  }
}

export default handler
