import { dbAdmin } from '@firebase/admin/index'
import { cors } from '@helpers/apis/'
import initMiddleware from '@helpers/lib/init-middleware'

const handler = async (req, res) => {
  await initMiddleware(req, res, cors)

  const {
    query: { role },
  } = req

  if (req.method !== 'GET') {
    return res.status(400).json({ error: 'Method not allowed' })
  }

  if (req.method === 'GET' && role === 'admin') {
    const users = []

    dbAdmin
      .collection('users')
      .orderBy('createdAt', 'desc')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          users.push({
            fullName: doc.data().fullName,
            phone: doc.data().phone,
            email: doc.data().email,
            imageUrl: doc.data().imageUrl,
            role: doc.data().role,
            userName: doc.data().userName,
            userId: doc.data().userId,
            instrument: doc.data().instrument,
            mariachiId: doc.data().mariachiId,
            enable: doc.data().enable,
          })
        })
        return res.status(201).json(users)
      })
      .catch((err) => res.status(400).json({ error: err }))
  } else if (req.method === 'GET' && role === 'coordinator') {
    const users = []

    dbAdmin
      .collection('mariachis')
      .where('members', 'array-contains-any', [req.user.userId])
      .get()
      .then((snap) => {
        const { mariachiId } = snap.docs[0].data()
        return (
          dbAdmin
            .collection('users')
            .where('mariachiId', '==', mariachiId)
            // .orderBy("createdAt", "desc")
            .get()
        )
      })
      .then((snap) => {
        snap.forEach((doc) => {
          users.push({
            fullName: doc.data().fullName,
            phone: doc.data().phone,
            email: doc.data().email,
            imageUrl: doc.data().imageUrl,
            role: doc.data().role,
            userName: doc.data().userName,
            instrument: doc.data().instrument,
            userId: doc.data().userId,
            mariachiId: doc.data().mariachiId,
            enable: doc.data().enable,
          })
        })
        return res.status(201).json(users)
      })

      .catch((err) => res.status(400).json(err))
  } else {
    return res.status(400).json({ error: 'You cannot see all reservations' })
  }
}

export default handler
