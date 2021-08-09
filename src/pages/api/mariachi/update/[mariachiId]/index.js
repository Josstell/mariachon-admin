import { dbAdmin } from '@firebase/admin/index'
import { authMiddleware } from '@helpers/lib/auth-middleware'
import { reduceMariachiDetails } from '@helpers/apis/'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Method not allowed' })
  }

  const {
    query: { mariachiId },
  } = req

  switch (req.user.role) {
    case 'admin':
      break
    case 'coordinator':
      break

    default:
      return res.json({
        message: 'You have no rigths to update this mariachi',
      })
  }

  if (req.method === 'POST') {
    !req.body && (req.body = {})

    const mariachiDetails = reduceMariachiDetails(req.body)

    dbAdmin
      .doc(`mariachis/${mariachiId}`)
      .get()
      .then((snap) => {
        if (snap.data().coordinatorId !== req.user.userId) {
          if (req.user.role === 'admin') {
            return dbAdmin
              .doc(`mariachis/${mariachiId}`)
              .update(mariachiDetails)
          }
          return res.json({
            message: 'You have no rights to edit this mariachi.',
          })
        }
        return dbAdmin.doc(`mariachis/${mariachiId}`).update(mariachiDetails)
      })
      .then(() => res.json({ message: 'Details added successfully' }))
      .catch((err) => {
        console.log(err)
        return res.status(500).json({ error: err.code })
      })
  }
}

export default authMiddleware(handler)
