import { dbAdmin } from '@firebase/admin/index'
import { authMiddleware } from '@helpers/lib/auth-middleware'

const handler = async (req, res) => {
  let ID

  if (req.method !== 'GET') {
    return res.status(400).json({ error: 'Method not allowed' })
  }

  if (req.method === 'GET') {
    const userData = {}

    ID = req.user.userId

    const mariachi =
      req.user.role === 'mariachi' || req.user.role === 'coordinator'
    if (mariachi) {
      dbAdmin
        .doc(`/users/${ID}`)
        .get()
        .then((snap) => {
          userData.userCredentials = snap.data()
          return (
            dbAdmin
              .collection('reservations')
              .where('mariachiId', '==', userData.userCredentials.mariachiId)
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
          userData.userCredentials = snap.data()
          return (
            dbAdmin
              .collection('reservations')
              .where('clientId', '==', userData.userCredentials.userId)
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
    } else if (req.user.role === 'admin') {
      dbAdmin
        .doc(`/users/${ID}`)
        .get()
        .then((snap) => {
          userData.userCredentials = snap.data()
          res.setPreviewData({
            role: req.user.role,
            userId: req.user.userId,
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
