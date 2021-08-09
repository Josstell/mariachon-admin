import { dbAdmin } from '@firebase/admin/index'

import { cors } from '@helpers/apis/'

import initMiddleware from '@helpers/lib/init-middleware'

const handler = async (req, res) => {
  initMiddleware(req, res, cors)

  const {
    query: { role, userId },
  } = req

  if (req.method !== 'GET') {
    return res.status(400).json({ error: 'Method not allowed' })
  }

  if (req.method === 'GET' && role === 'admin') {
    const reservations = []

    dbAdmin
      .collection('reservations')
      .orderBy('createdAt', 'desc')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          reservations.push({
            reservationId: doc.data().reservationId,
            service: doc.data().service,
            price: doc.data().price,
            date: doc.data().date,
            address: doc.data().address,
            qty: doc.data().qty,
            status: doc.data().status,
            createdBy: doc.data().createdBy,
            description: doc.data().description,
            mariachiId: doc.data().mariachiId,
            coordinatorId: doc.data().coordinatorId,
            clientId: doc.data().clientId,
            deposit: doc.data().deposit,
            location: doc.data().location,
            message: doc.data().message,
            playlist: doc.data().playlist,
          })
        })

        const reserva = reservations.filter(
          (reservas) => reservas.reservationId !== undefined
        )

        return res.status(201).json(reserva)
      })
      .catch((err) => res.status(400).json({ error: err.message }))
  } else if (req.method === 'GET' && role === 'client') {
    const reservations = []

    dbAdmin
      .collection('reservations')
      .where('clientId', '==', userId)
      // .orderBy("createdAt", "desc")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          reservations.push({
            reservationId: doc.data().reservationId,
            service: doc.data().service,
            price: doc.data().price,
            date: doc.data().date,
            address: doc.data().address,
            qty: doc.data().qty,
            status: doc.data().status,
            createdBy: doc.data().createdBy,
            description: doc.data().description,
            mariachiId: doc.data().mariachiId,
            coordinatorId: doc.data().coordinatorId,
            clientId: doc.data().clientId,
            deposit: doc.data().deposit,
            location: doc.data().location,
            message: doc.data().message,
            playlist: doc.data().playlist,
          })
        })

        const reserva = reservations.filter(
          (reservas) => reservas.reservationId !== undefined
        )

        return res.status(201).json(reserva)
      })

      .catch((err) => res.status(400).json({ error: err.message }))
  } else if (req.method === 'GET' && role === 'coordinator') {
    const reservations = []

    dbAdmin
      .collection('reservations')
      .where('coordinatorId', '==', userId)
      // .orderBy("createdAt", "desc")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          reservations.push({
            reservationId: doc.data().reservationId,
            service: doc.data().service,
            price: doc.data().price,
            date: doc.data().date,
            address: doc.data().address,
            qty: doc.data().qty,
            status: doc.data().status,
            createdBy: doc.data().createdBy,
            description: doc.data().description,
            mariachiId: doc.data().mariachiId,
            coordinatorId: doc.data().coordinatorId,
            clientId: doc.data().clientId,
            deposit: doc.data().deposit,
            location: doc.data().location,
            message: doc.data().message,
            playlist: doc.data().playlist,
          })
        })
        const reserva = reservations.filter(
          (reservas) => reservas.reservationId !== undefined
        )

        return res.status(201).json(reserva)
      })
      .catch((err) => res.status(400).json({ error: err.message }))
  } else if (req.method === 'GET' && role === 'mariachi') {
    const reservations = []

    dbAdmin
      .collection('mariachis')
      .where('members', 'array-contains-any', [userId])
      .get()
      .then((snap) => {
        const { mariachiId } = snap.docs[0].data()

        return (
          dbAdmin
            .collection('reservations')
            .where('mariachiId', '==', mariachiId)
            // .orderBy("createdAt", "desc")
            .get()
        )
      })
      .then((snap) => {
        snap.forEach((doc) => {
          reservations.push({
            reservationId: doc.data().reservationId,
            service: doc.data().service,
            price: doc.data().price,
            date: doc.data().date,
            address: doc.data().address,
            qty: doc.data().qty,
            status: doc.data().status,
            createdBy: doc.data().createdBy,
            description: doc.data().description,
            mariachiId: doc.data().mariachiId,
            coordinatorId: doc.data().coordinatorId,
            clientId: doc.data().clientId,
            deposit: doc.data().deposit,
            location: doc.data().location,
            message: doc.data().message,
            playlist: doc.data().playlist,
          })
        })
        const reserva = reservations.filter(
          (reservas) => reservas.reservationId !== undefined
        )

        return res.status(201).json(reserva)
      })
      .catch((err) => res.status(400).json({ error: err.message }))

    // dbAdmin
    //     .collection("reservations")
    //     .where("coordinatorId", "==", req.user.userId)
    //     // .orderBy("createdAt", "desc")
    //     .get()
    //     .then(snap => {
    //         snap.forEach(doc => {
    //             reservations.push({
    //                 reservationId: doc.data().reservationId,
    //                 service: doc.data().service,
    //                 price: doc.data().price,
    //                 date: doc.data().date,
    //                 description: doc.data().description,
    //                 mariachiId: doc.data().mariachiId,
    //                 coordinatorId: doc.data().coordinatorId,
    //                 clientId: doc.data().clientId,
    //             })
    //         })
    //         return res.status(201).json(reservations)
    //     })

    //     .catch(err => {
    //         return res.status(400).json({ error: "Somenthing went" })
    //     })
  } else {
    return res.status(400).json({ error: 'You cannot see all reservations' })
  }
}

export default handler
