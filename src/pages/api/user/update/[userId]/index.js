import { dbAdmin } from '@firebase/admin/index'
import { authMiddleware } from '@helpers/lib/auth-middleware'
import { reduceUserDetails } from '@helpers/apis/'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Method not allowed' })
  }

  const {
    query: { userId },
  } = req

  if (!(req.user.userId === userId || req.user.role === 'admin')) {
    return res.json({ message: 'You have no rigths to update this user' })
  }

  if (req.method === 'POST') {
    !req.body && (req.body = {})

    const userDetails = reduceUserDetails(req.body, req.user.role)

    dbAdmin
      .doc(`users/${userId}`)
      .update(userDetails)
      .then(() => res.json({ message: 'Details added successfully' }))
      .catch((err) => {
        return res.status(500).json({ error: err.code })
      })
  }
}

export default authMiddleware(handler)
