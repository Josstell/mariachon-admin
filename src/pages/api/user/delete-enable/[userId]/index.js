import { dbAdmin } from '@firebase/admin/index'
import { authMiddleware } from '@helpers/lib/auth-middleware'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Method not allowed' })
  }

  const {
    query: { userId },
  } = req

  if (req.method === 'POST') {
    const document = dbAdmin.doc(`users/${userId}`)

    const userDetails = {}
    userDetails.enable = req.body.enable

    document
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return res.status(404).json({ error: 'User not found' })
        }
        if (req.user.role !== 'admin') {
          return res.status(403).json({ error: 'Unauthorized' })
        }
        return document.update(userDetails)
      })
      .then(() => {
        if (!req.body.enable) {
          res.json({ message: 'user disable successfully' })
        }
        res.json({ message: 'user enable successfully' })
      })
      .catch((err) => {
        return res.status(500).json({ error: err.code })
      })
  }
}

export default authMiddleware(handler)
