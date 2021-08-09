import { dbAdmin } from '@firebase/admin/index'
import { authMiddleware } from '@helpers/lib/auth-middleware'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Method not allowed' })
  }

  const {
    query: { mariachiId },
  } = req

  if (!(req.user.role === 'admin')) {
    return res.json({ message: 'You have no rigths to update this user' })
  }

  if (req.method === 'POST') {
    const document = dbAdmin.doc(`mariachis/${mariachiId}`)

    const mariachiDetails = {}
    mariachiDetails.enable = req.body.enable

    document
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return res.status(404).json({ error: 'Mariachis not found' })
        }
        if (req.user.role !== 'admin') {
          return res.status(403).json({ error: 'Unauthorized' })
        }
        return document.update(mariachiDetails)
      })
      .then(() => {
        if (!req.body.enable) {
          res.json({ message: 'mariachi disable successfully' })
        }
        res.json({ message: 'mariachi enable successfully' })
      })
      .catch((err) => {
        return res.status(500).json({ error: err.code })
      })
  }
}

export default authMiddleware(handler)
