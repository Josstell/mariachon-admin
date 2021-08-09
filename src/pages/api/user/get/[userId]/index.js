import { dbAdmin } from '@firebase/admin/index'
import { authMiddleware } from '@helpers/lib/auth-middleware'

const handler = async (req, res) => {
  const {
    query: { userId },
  } = req
  let ID

  if (req.method !== 'GET') {
    return res.status(400).json({ error: 'Method not allowed' })
  }

  if (req.method === 'GET') {
    const userData = {}

    if (req.user.role === 'admin') {
      ID = userId
    } else {
      ID = req.user.userId
    }
    const mariachi =
      req.user.role === 'mariachi' || req.user.role === 'coordinator'
    if (mariachi || (req.user.role === 'admin' && !mariachi)) {
      dbAdmin
        .doc(`/users/${ID}`)
        .get()
        .then((snap) => {
          userData.userCrendentials = snap.data()
          return (
            dbAdmin
              .collection('reservations')
              .where('mariachiId', '==', userData.userCrendentials.mariachiId)
              // .orderBy("createdAt", "desc")
              .get()
          )
        })
        .then((snap) => {
          userData.reservations = []

          snap.forEach((doc) => {
            userData.reservations.push({
              reservationId: doc.data().reservationId,
              service: doc.data().service,
              price: doc.data().price,
              date: doc.data().date,
              mariachiId: doc.data().mariachiId,
              clientId: doc.data().clientId,
            })
          })
          return res.status(201).json(userData)
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (req.user.role === 'client') {
      dbAdmin
        .doc(`/users/${ID}`)
        .get()
        .then((snap) => {
          userData.userCrendentials = snap.data()
          return (
            dbAdmin
              .collection('reservations')
              .where('clientId', '==', userData.userCrendentials.userId)
              // .orderBy("createdAt", "desc")
              .get()
          )
        })
        .then((snap) => {
          userData.reservations = []

          snap.forEach((doc) => {
            userData.reservations.push({
              reservationId: doc.data().reservationId,
              service: doc.data().service,
              price: doc.data().price,
              date: doc.data().date,
              mariachiId: doc.data().mariachiId,
              clientId: doc.data().clientId,
            })
          })
          return res.status(201).json(userData)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}

export default authMiddleware(handler)
