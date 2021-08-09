/* eslint-disable no-useless-escape */
import Cors from 'cors'
import initMiddleware from '@helpers/lib/init-middleware'
import { dbAdmin } from '@firebase/admin/index'

export const isEmpty = (string) => {
  if (string.trim() === '') return true
}

export const isEmail = (email) => {
  const regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (email.match(regEx)) return true
  return false
}

// Initialize the cors middleware
export const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

/// Get data from coordinator user

export const getDataCoordinator = async (item) => {
  const user = new Promise((resolve, reject) => {
    dbAdmin
      .collection('users')
      .doc(item)
      .get()
      .then((snap) => {
        resolve(snap.data())
      })
      .catch(() => {
        const er = { error: 'Coordinator not found' }
        reject(er)
      })
  })

  return await user
}

export const reduceUserDetails = (data, role) => {
  const userDetails = {}

  if (!isEmpty(data?.fullName ? data.fullName : '')) {
    userDetails.fullName = data.fullName
  } else {
    userDetails.fullName = ''
  }

  if (!isEmpty(data?.phone ? data.phone : '')) {
    userDetails.phone = data.phone
  } else {
    userDetails.phone = ''
  }

  if (!isEmpty(data?.userName ? data.userName : '')) {
    userDetails.userName = data.userName
  } else {
    userDetails.userName = ''
  }

  if (!isEmpty(data?.state ? data.state : '')) {
    userDetails.state = data.state
  } else {
    userDetails.state = ''
  }

  if (role === 'mariachi' || role === 'coordinator') {
    if (data.instrument ? data.instrument : '') {
      userDetails.instrument = data.instrument
    } else {
      userDetails.instrument = ''
    }
  }

  if (role === 'admin') {
    if (data?.enable) {
      userDetails.enable = data.enable
    } else {
      userDetails.enable = false
    }

    if (data.role === 'mariachi' || data.role === 'coordinator') {
      userDetails.instrument = data.instrument
    }
  }

  return userDetails
}

export const reduceMariachiDetails = (data) => {
  const mariachiDetails = {}

  if (!isEmpty(data?.description.trim())) {
    mariachiDetails.description = data.description
  } else {
    mariachiDetails.description = ''
  }

  if (!isEmpty(data?.userName.trim())) {
    mariachiDetails.coordinatorUserName = data.userName
  } else {
    mariachiDetails.coordinatorUserName = ''
  }

  mariachiDetails.service_price = {}

  if (data.service_price.hora) {
    mariachiDetails.service_price.hora = data.service_price.hora
  }
  if (data.service_price.serenata) {
    mariachiDetails.service_price.serenata = data.service_price.serenata
  }

  if (data.service_price.contrato) {
    mariachiDetails.service_price.contrato = data.service_price.contrato
  }
  if (data.images) {
    mariachiDetails.images = data.images
  }

  if (data.videos) {
    mariachiDetails.videos = data.videos
  }

  return mariachiDetails
}

export const reduceReservationDetails = (data, role) => {
  const reservationDetails = {}

  if (role === 'admin') {
    if (!isEmpty(data?.mariachiId.trim())) {
      reservationDetails.mariachiId = data.mariachiId
    }

    if (!isEmpty(data?.address.trim())) {
      reservationDetails.address = data.address
    }

    if (!isEmpty(data?.date.trim())) {
      reservationDetails.date = data.date
    }

    if (!isEmpty(data?.location.trim())) {
      reservationDetails.location = data.location
    } else {
      reservationDetails.location = ''
    }

    if (!isEmpty(data?.service.trim())) {
      reservationDetails.service = data.service
    }

    if (data?.price) {
      reservationDetails.price = data.price
    }

    if (data?.deposit) {
      reservationDetails.deposit = data.deposit
    } else {
      reservationDetails.deposit = 0
    }

    if (data?.qty) {
      reservationDetails.qty = data.qty
    }

    if (!isEmpty(data?.payment.trim())) {
      reservationDetails.payment = data.payment
    } else {
      reservationDetails.payment = ''
    }

    if (!isEmpty(data?.message.trim())) {
      reservationDetails.message = data.message
    } else {
      reservationDetails.message = ''
    }

    if (data.playlist.length > 0) {
      reservationDetails.playlist = data.playlist
    }

    if (!isEmpty(data?.status.trim())) {
      reservationDetails.status = data.status
    } else {
      reservationDetails.status = 'Pendiente a enviar'
    }
  }

  if (role === 'client') {
    if (!isEmpty(data?.address.trim())) {
      reservationDetails.address = data.address
    } else {
      reservationDetails.address = ''
    }

    if (!isEmpty(data?.date.trim())) {
      reservationDetails.date = data.date
    } else {
      reservationDetails.date = ''
    }

    if (!isEmpty(data?.location.trim())) {
      reservationDetails.location = data.location
    } else {
      reservationDetails.location = ''
    }

    if (data?.qty) {
      reservationDetails.qty = data.qty
    }

    if (!isEmpty(data?.message.trim())) {
      reservationDetails.message = data.message
    } else {
      reservationDetails.message = ''
    }

    if (data.playlist) {
      reservationDetails.playlist = data.playlist
    } else {
      reservationDetails.playlist = ''
    }

    if (!isEmpty(data?.payment.trim())) {
      reservationDetails.payment = data.payment
    } else {
      reservationDetails.payment = ''
    }

    if (!isEmpty(data?.status.trim())) {
      reservationDetails.status = data.status
    } else {
      reservationDetails.status = 'Pendiente a enviar'
    }
  }

  if (role === 'coordinator') {
    if (!isEmpty(data?.status.trim())) {
      reservationDetails.status = data.status
    } else {
      reservationDetails.status = 'Pendiente a enviar'
    }
    if (data?.qty) {
      reservationDetails.qty = data.qty
    }
  }

  return reservationDetails
}

/*****************************
 *
 *  Get data directly from server firebase
 *
 * **/

/*********
 *
 * Get allMariachis
 *
 * *******/

export const getDataMariachis = () => {
  const mariachis = []
  return new Promise((resolve, reject) => {
    dbAdmin
      .collection('mariachis')
      .orderBy('createdAt', 'desc')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          mariachis.push({
            mariachiId: doc.data().mariachiId,
            name: doc.data().name,
            images: doc.data().images,
            videos: doc.data().videos,
            service_price: doc.data().service_price,
            description: doc.data().description,
            coordinatorData: doc.data().coordinatorUserName,
            coordinatorId: doc.data().coordinatorId,
            slug: doc.data().slug,
            imageLogo: doc.data().imageLogo,
          })
        })
        resolve(mariachis)
      })
      .catch((err) => reject(err))
  })
}

/*********
 *
 * Get allUsers
 *
 * *******/

export const getDataUsers = () => {
  const users = []
  return new Promise((resolve, reject) => {
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
            instrument: doc.data().instrument || null,
            mariachiId: doc.data().mariachiId || null,
            enable: doc.data().enable || false,
          })
        })
        resolve(users)
      })
      .catch((err) => reject(err))
  })
}

/*********
 *
 * Get reservations
 *
 * *******/

export const getDataReservations = () => {
  const reservations = []
  return new Promise((resolve, reject) => {
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
            description: doc.data().description || null,
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

        resolve(reserva)
      })
      .catch((err) => reject(err))
  })
}

/*********
 *
 * Get params
 *
 * *******/

export const getDataParams = () => {
  return new Promise((resolve, reject) => {
    dbAdmin
      .collection('params')
      .get()
      .then((snap) => {
        const { payment } = snap.docs[0].data()
        const userTypes = snap.docs[0].data().userPermits
        const { instruments } = snap.docs[0].data()
        const { services } = snap.docs[0].data()
        const { status } = snap.docs[0].data()

        const params = {
          payment,
          userTypes,
          instruments,
          services,
          status,
        }
        resolve(params)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
