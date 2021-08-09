import { dbAdmin } from '@firebase/admin/index'
import { authMiddleware } from '@helpers/lib/auth-middleware'

const handler = async (req, res) => {
  const {
    query: { reservationId },
  } = req

  if (req.method !== 'GET') {
    return res.status(400).json({ error: 'Method not allowed' })
  }

  if (req.method === 'GET') {
    const reservationsData = {}
    console.log(reservationId)

    dbAdmin
      .doc(`/reservations/${reservationId}`)
      .get()
      .then((doc) => {
        reservationsData.reservationDetails = doc.data()

        if (
          req.user.userId === reservationsData.reservationDetails.clientId ||
          req.user.userId ===
            reservationsData.reservationDetails.coordinatorId ||
          req.user.role === 'admin'
        ) {
          return dbAdmin
            .collection('users/')
            .where('userId', '==', reservationsData.reservationDetails.clientId)
            .get()
        }
        return res
          .status(400)
          .json({ error: 'You have not autorization to see this reservation' })
      })
      .then((docs) => {
        docs.forEach((doc) => {
          reservationsData.reservationDetails.clientDetails = doc.data()
        })

        return dbAdmin
          .collection('mariachis/')
          .where(
            'mariachiId',
            '==',
            reservationsData.reservationDetails.mariachiId
          )
          .get()
      })
      .then((docs) => {
        docs.forEach((doc) => {
          reservationsData.reservationDetails.mariachiDetails = doc.data()
        })
        return res.json(reservationsData)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export default authMiddleware(handler)
