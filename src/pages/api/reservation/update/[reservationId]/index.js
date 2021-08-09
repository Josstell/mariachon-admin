import { dbAdmin } from '@firebase/admin/index'
import { authMiddleware } from '@helpers/lib/auth-middleware'
import { reduceReservationDetails } from '@helpers/apis/'

const handler = async (req, res) => {
  if (req.method !== 'PUT') {
    return res.status(400).json({ error: 'Method not allowed' })
  }

  const {
    query: { reservationId },
  } = req

  if (req.method === 'PUT') {
    !req.body && (req.body = {})

    const reservationDetails = reduceReservationDetails(req.body, req.user.role)

    dbAdmin
      .doc(`reservations/${reservationId}`)
      .get()
      .then((snap) => {
        if (req.user.role === 'admin') {
          return dbAdmin
            .doc(`reservations/${reservationId}`)
            .update(reservationDetails)
        }
        if (
          snap.data().coordinatorId !== req.user.userId ||
          snap.data().clientId !== req.user.userId
        ) {
          return res.json({
            message: 'You have no rights to edit this mariachi.',
          })
        }
        return dbAdmin
          .doc(`reservations/${reservationId}`)
          .update(reservationDetails)
      })
      .then(() => {
        return dbAdmin.doc(`/reservations/${reservationId}`).get()
      })
      .then((reservationUpdated) => {
        return res.json({
          message: 'Details added successfully',
          reservaUpdated: reservationUpdated.data(),
        })
      })
      .catch((err) => {
        console.log(err)
        return res.status(500).json({ error: err.code })
      })
  }
}

export default authMiddleware(handler)
