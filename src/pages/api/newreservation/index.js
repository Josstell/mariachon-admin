import { dbAdmin } from '@firebase/admin/index'

import { authMiddleware } from '@helpers/lib/auth-middleware'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Method not allowed' })
  }

  const newReservation = {
    clientId: req.user.userId,
    mariachiId: req.body.mariachiId,
    coordinatorId: req.body.coordinatorId,
    address: req.body.address,
    date: req.body.date,
    service: req.body.service,
    price: req.body.price,
    deposit: req.body.deposit,
    payment: req.body.payment,
    message: req.body.message,
    playlist: req.body.playlist,
    qty: req.body.qty,
    location: req.body.location,
    createdAt: new Date().toISOString(),
    createdBy: req.user.userName,
    status: req.body.status,
  }

  if (req.user.role === 'admin') {
    newReservation.clientId = req.body.clientId
  }

  if (req.method === 'POST') {
    let resReservation = {}

    console.log(newReservation)

    dbAdmin
      .collection('reservations')
      .add(newReservation)
      .then((doc) => {
        resReservation = newReservation
        resReservation.reservationId = doc.id
        dbAdmin
          .doc(`/reservations/${resReservation.reservationId}`)
          .set(resReservation)
      })
      .then(() => res.status(201).json(resReservation))
      .catch((err) => {
        res.status(500).json({ error: err })
      })
  }
}

module.exports = authMiddleware(handler)
