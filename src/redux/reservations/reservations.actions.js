import axios from 'axios'
import {
  editUserDetailsAdmin,
  getAllUsersLocally,
} from '@redux/users/users.actions'

import {
  CLEAR_ALL_RESERVATIONS_ADMIN,
  CLEAR_ALL_RESERVATIONS,
  GET_ALL_RESERVATIONS_ADMIN,
  SET_ALL_RESERVATIONS,
  SET_RESERVATION_TO_EDIT,
  REQUEST_UPDATE_RESERVATION_BY_ID,
  GET_SUCCESS_ALL_RESERVATIONS_FROM_SERVER,
  GET_REQUEST_ALL_RESERVATIONS_FROM_SERVER,
  GET_FAILURE_ALL_RESERVATIONS_FROM_SERVER,
  REQUEST_GET_RESERVATION_BY_ID,
  SUCCESS_GET_RESERVATION_BY_ID,
  FAILURE_GET_RESERVATION_BY_ID,
  FAILURE_UPDATE_RESERVATION_BY_ID,
  SUCCESS_UPDATE_RESERVATION_BY_ID,
  SET_ALL_PARAMS,
  CREATE_REQUEST_NEW_RESERVATION,
  ADD_NEW_CLIENT_REQUEST_NEW_RESERVATION,
  ADD_NEW_CLIENT_SUCCESS_NEW_RESERVATION,
  FAILURE_REQUEST_NEW_RESERVATION,
  SUCCESS_REQUEST_NEW_RESERVATION,
  SUCCESS_SEND_WHATSAPP_TO_COORDINATOR,
  REQUEST_SEND_WHATSAPP_TO_COORDINATOR,
  REQUEST_UPDATE_STATE_GESTION_RESERVATIONS,
  SUCCESS_UPDATE_STATE_GESTION_RESERVATIONS,
  FAILURE_UPDATE_STATE_GESTION_RESERVATIONS,
  SUCCESS_ADD_RESERVATION_TO_GOOGLE_SHEET,
  REQUEST_ADD_RESERVATION_TO_GOOGLE_SHEET,
  FAILURE_ADD_RESERVATION_TO_GOOGLE_SHEET,
  REQUEST_UPDATE_RESERVATION_TO_GOOGLE_SHEET,
  SUCCESS_UPDATE_RESERVATION_TO_GOOGLE_SHEET,
  FAILURE_UPDATE_RESERVATION_TO_GOOGLE_SHEET,
  SAVE_RESERVATION_UPDATE,
  REQUEST_SEND_EMAIL_RESERVATION,
  SUCCESS_SEND_EMAIL_RESERVATION,
  FAILURE_SEND_EMAIL_RESERVATION,
} from './reservations.types'
import { createUrlWhatsApp } from '@helpers/lib/index'
import { getClientData, getMariachiData } from '@helpers/lib'

const URL_API = process.env.NEXT_PUBLIC_URL_API

const { NEXT_PUBLIC_SPREADSHEET_ID_MARIACHON } = process.env
const { NEXT_PUBLIC_SHEET_ID } = process.env

const varToken = process.env.NEXT_PUBLIC_VAR_TOKEN

export const setAllReservations = (reservations) => async (dispatch) => {
  await dispatch({
    type: CLEAR_ALL_RESERVATIONS,
  })

  await dispatch({
    type: SET_ALL_RESERVATIONS,
    payload: reservations,
  })
}

export const getAllResevationsFromServer =
  (role, userId) => async (dispatch) => {
    dispatch({ type: GET_REQUEST_ALL_RESERVATIONS_FROM_SERVER })

    await axios
      .get(`${URL_API}/api/reservation/get/all?role=${role}&?userId=${userId}`)
      .then(async (snap) => {
        const dat = await snap.data
        return await dispatch(setAllReservations(dat))
      })
      .then(() => {
        dispatch({ type: GET_SUCCESS_ALL_RESERVATIONS_FROM_SERVER })
      })
      .catch((err) => {
        dispatch({
          type: GET_FAILURE_ALL_RESERVATIONS_FROM_SERVER,
          payload: err.message,
        })
      })
  }

export const getAllResevasAdmin = () => async (dispatch, getSate) => {
  const { allReservations, allUsers, allMariachis } = getSate()

  dispatch({
    type: CLEAR_ALL_RESERVATIONS_ADMIN,
  })

  await dispatch({
    type: GET_ALL_RESERVATIONS_ADMIN,
    payload: { allReservations, allUsers, allMariachis },
  })
}

export const setReservationToEdit =
  (reservationId) => async (dispatch, getSate) => {
    const { allReservationsAdmin } = getSate()

    const reservationData = await allReservationsAdmin.find(
      (reserva) => reserva.reservationId === reservationId
    )

    dispatch({
      type: SET_RESERVATION_TO_EDIT,
      payload: reservationData,
    })
  }

export const getReservationByIdAPI = (reservationId) => async (dispatch) => {
  dispatch({ type: REQUEST_GET_RESERVATION_BY_ID })

  await axios
    .get(`${URL_API}/api/reservation/get/${reservationId}`)
    .then((snap) => {
      const reservation = snap.data
      return reservation
    })
    .then((data) => {
      dispatch({
        type: SUCCESS_GET_RESERVATION_BY_ID,
        payload: data,
      })
    })
    .catch((err) => {
      dispatch({
        type: FAILURE_GET_RESERVATION_BY_ID,
        payload: err,
      })
    })
}

export const updateReservationById =
  (reservationId, reservationDetails, clientData, role, userId) =>
  async (dispatch, getSate) => {
    dispatch({ type: REQUEST_UPDATE_RESERVATION_BY_ID })

    const { allUsers, allMariachis } = getSate()

    await dispatch(editUserDetailsAdmin(clientData, clientData.userId))

    // await dispatch(getAllUsersLocally())

    await axios
      .put(
        `${URL_API}/api/reservation/update/${reservationId}`,
        reservationDetails
      )
      .then(async (reservation) => {
        const { reservaUpdated } = reservation.data
        const reserva = await reservaUpdated

        const mariachiData = getMariachiData(
          await reserva.mariachiId,
          allMariachis
        )

        const coordinatorData = getClientData(
          await reserva.coordinatorId,
          allUsers
        )

        const dataClient = {
          nameClient: clientData.fullName,
          phone: clientData.phone,
          email: clientData.email,
        }

        reserva.mariachiData = mariachiData
        reserva.client = dataClient
        reserva.coordinatorData = coordinatorData

        reserva.subject = `Actualización de  reservación - ${reserva.reservationId} - solicitada por ${clientData.fullName} `

        reserva.contentMessage = `Hola, ${clientData.fullName}, su reservación ha sido actualizada.`

        await dispatch({
          type: SAVE_RESERVATION_UPDATE,
          payload: { reserva },
        })

        await dispatch(updateNewReservationToGoogleSheet(reserva))
        await dispatch(getAllResevationsFromServer(role, userId))
        await dispatch(sendEmailReservationToCLientAndMariachi(await reserva))
      })
      .then(async () => {
        await dispatch({
          type: SUCCESS_UPDATE_RESERVATION_BY_ID,
          payload: 'updated successfully',
        })
      })
      .catch((err) => {
        dispatch({
          type: FAILURE_UPDATE_RESERVATION_BY_ID,
          payload: err.message,
        })
      })
  }

export const setAllReserParameters = (reservationParams) => (dispatch) => {
  dispatch({
    type: SET_ALL_PARAMS,
    payload: reservationParams,
  })
}

export const createReservationNewClientWithoutEmail =
  (reservationData, mariachiData, newUser) => (dispatch, getSate) => {
    const {
      users: {
        credentials: { userId, role },
      },
      allUsers,
    } = getSate()

    let addNewReservation = {}

    dispatch({ type: CREATE_REQUEST_NEW_RESERVATION })

    dispatch({ type: ADD_NEW_CLIENT_REQUEST_NEW_RESERVATION })
    axios
      .post(`${URL_API}/api/user/add-no-email`, newUser)
      .then((respon) => {
        addNewReservation = {
          ...reservationData,
          clientId: respon.data.userId,
        }
        return dispatch(getAllUsersLocally())
      })
      .then(() => {
        dispatch({
          type: ADD_NEW_CLIENT_SUCCESS_NEW_RESERVATION,
        })
        return axios.post(`${URL_API}/api/newreservation`, addNewReservation)
      })
      .then(async (response) => {
        const reserva = await response.data

        reserva.mariachi = mariachiData.name
        reserva.client = newUser.fullName
        reserva.phone = newUser.phone
        reserva.email = newUser.email

        const dataClient = {
          nameClient: newUser.fullName,
          phone: newUser.phone,
          email: newUser.email,
        }

        // const clientData =  getClientData(await reserva.clientId, allUsers)
        const coordinatorData = getClientData(
          await reserva.coordinatorId,
          allUsers
        )

        reserva.mariachiData = mariachiData
        reserva.clientD = dataClient
        reserva.coordinatorData = coordinatorData

        reserva.subject = `Nueva reservación - ${reserva.reservationId} - solicitada por ${newUser.fullName} `

        reserva.contentMessage = `Hola, ${newUser.fullName}, el equipo de Mariachon agradece su preferencia.`

        reserva.coodinator = await allUsers.filter(
          (user) => user.userId === reserva.coordinatorId
        )[0].userName

        await dispatch({
          type: SAVE_RESERVATION_UPDATE,
          payload: { reserva },
        })

        await dispatch(addNewReservationToGoogleSheet(await reserva))
        await dispatch(getAllResevationsFromServer(role, userId))

        await dispatch({
          type: SUCCESS_REQUEST_NEW_RESERVATION,
        })

        await dispatch(sendEmailReservationToCLientAndMariachi(await reserva))

        //  return dispatch(addNewReservationToGoogleSheet())
      })
      .catch((err) => {
        dispatch({
          type: FAILURE_REQUEST_NEW_RESERVATION,
          payload: err,
        })
      })
  }

export const createReservationNewClientAndOldClient =
  (reservationData, mariachiData, newUser, newClient) =>
  (dispatch, getSate) => {
    const {
      users: {
        credentials: { userId, role },
      },
      allUsers,
    } = getSate()

    let addNewReservation = {}

    dispatch({ type: CREATE_REQUEST_NEW_RESERVATION })

    if (newClient) {
      dispatch({ type: ADD_NEW_CLIENT_REQUEST_NEW_RESERVATION })
      axios
        .post(`${URL_API}/api/signup/client`, newUser)
        .then((respon) => {
          addNewReservation = {
            ...reservationData,
            clientId: respon.data.userId,
          }

          return dispatch(getAllUsersLocally())
        })
        .then(() => {
          dispatch({
            type: ADD_NEW_CLIENT_SUCCESS_NEW_RESERVATION,
          })
          return axios.post(`${URL_API}/api/newreservation`, addNewReservation)
        })
        .then(async (respon) => {
          const reserva = respon.data
          reserva.mariachi = mariachiData.name
          reserva.client = newUser.fullName
          reserva.phone = newUser.phone
          reserva.email = newUser.email

          const dataClient = {
            nameClient: newUser.fullName,
            phone: newUser.phone,
            email: newUser.email,
          }

          // const clientData =  getClientData(await reserva.clientId, allUsers)
          const coordinatorData = getClientData(
            await reserva.coordinatorId,
            allUsers
          )

          reserva.mariachiData = mariachiData
          reserva.clientD = dataClient
          reserva.coordinatorData = coordinatorData

          reserva.subject = `Nueva reservación - ${reserva.reservationId} - solicitada por ${newUser.fullName} `

          reserva.contentMessage = `Hola, ${newUser.fullName}, el equipo de Mariachon agradece su preferencia.`

          reserva.coodinator = await allUsers.filter(
            (user) => user.userId === reserva.coordinatorId
          )[0].userName

          await dispatch({
            type: SAVE_RESERVATION_UPDATE,
            payload: { reserva },
          })

          await dispatch(addNewReservationToGoogleSheet(await reserva))
          await dispatch(getAllResevationsFromServer(role, userId))
          await dispatch({
            type: SUCCESS_REQUEST_NEW_RESERVATION,
          })

          await dispatch(sendEmailReservationToCLientAndMariachi(await reserva))

          //  return dispatch(addNewReservationToGoogleSheet())
        })
        .catch((err) => {
          dispatch({
            type: FAILURE_REQUEST_NEW_RESERVATION,
            payload: err,
          })
        })
    } else {
      addNewReservation = {
        ...reservationData,
        clientId: newUser.userId,
      }

      axios
        .post(`${URL_API}/api/newreservation`, addNewReservation)
        .then(async (respon) => {
          const reserva = respon.data
          reserva.mariachi = mariachiData.name
          reserva.client = newUser.fullName
          reserva.phone = newUser.phone
          reserva.email = newUser.email

          const dataClient = {
            nameClient: newUser.fullName,
            phone: newUser.phone,
            email: newUser.email,
          }

          // const clientData =  getClientData(await reserva.clientId, allUsers)
          const coordinatorData = getClientData(
            await reserva.coordinatorId,
            allUsers
          )

          reserva.mariachiData = mariachiData
          reserva.clientD = dataClient
          reserva.coordinatorData = coordinatorData

          reserva.subject = `Nueva reservación - ${reserva.reservationId} - solicitada por ${newUser.fullName} `

          reserva.contentMessage = `Hola, ${newUser.fullName}, el equipo de Mariachon agradece su preferencia.`

          reserva.coodinator = await allUsers.filter(
            (user) => user.userId === reserva.coordinatorId
          )[0].userName

          await dispatch({
            type: SAVE_RESERVATION_UPDATE,
            payload: { reserva },
          })

          await dispatch(addNewReservationToGoogleSheet(reserva))
          await dispatch(getAllResevationsFromServer(role, userId))
          // await dispatch({ type: GET_ALL_RESERVATIONS_ADMIN })

          await dispatch({
            type: SUCCESS_REQUEST_NEW_RESERVATION,
          })
          await dispatch(sendEmailReservationToCLientAndMariachi(reserva))
        })
        .catch((err) => {
          dispatch({
            type: FAILURE_REQUEST_NEW_RESERVATION,
            payload: err,
          })
        })
    }
  }

export const createReservationCloudClient =
  (reservationData, ClientData) => (dispatch) => {
    dispatch({ type: CREATE_REQUEST_NEW_RESERVATION })
  }

export const sendReservationToWhatsAppAndUpdatState =
  (reservation) => async (dispatch, getSate) => {
    const { parameterForReservations } = getSate()
    const { status } = parameterForReservations
    const {
      users: {
        credentials: { userId, role },
      },
    } = getSate()

    dispatch({
      type: REQUEST_SEND_WHATSAPP_TO_COORDINATOR,
    })

    const url = await createUrlWhatsApp(reservation)

    dispatch({
      type: SUCCESS_SEND_WHATSAPP_TO_COORDINATOR,
      payload: url,
    })

    dispatch({
      type: REQUEST_UPDATE_STATE_GESTION_RESERVATIONS,
    })
    await axios
      .put(
        `${URL_API}/api/reservation/status/${reservation.reservationId}?status=${status.sent}`
      )
      .then(async () => {
        await dispatch(getAllResevationsFromServer(role, userId))
        const reserva = reservation
        reserva.status = status.sent

        reserva.subject = `Notificación de reservación - ${reserva.reservationId} - solicitada por ${reserva.client?.nameClient} `

        reserva.contentMessage = `Hola, ${reserva.client?.nameClient}, le recordamos que su evento se acerca. Cualquier cambio no dude contactarse con nuestro equipo de ventas.`

        await dispatch({ type: SAVE_RESERVATION_UPDATE, payload: { reserva } })

        await dispatch(updateNewReservationToGoogleSheet(await reserva))
        // await dispatch(testReservationGoogleSheet())

        await dispatch({
          type: SUCCESS_UPDATE_STATE_GESTION_RESERVATIONS,
          payload: 'updated successfully',
        })
        await dispatch(sendEmailReservationToCLientAndMariachi(reserva))
      })
      .catch((err) => {
        dispatch({
          type: FAILURE_UPDATE_STATE_GESTION_RESERVATIONS,
          payload: err.message,
        })
      })
  }

const apiAddReservationGoogleSheet = async (reservationData) => {
  const DataReservationAndSheet = {
    reservation: reservationData,
    NEXT_PUBLIC_SPREADSHEET_ID_MARIACHON,
    NEXT_PUBLIC_SHEET_ID,
  }

  const headers = {
    headers: {
      Authorization: varToken,
    },
  }
  await axios
    .post(
      `https://api-to-sheet.netlify.app/.netlify/functions/next_api_googlesheet_addmariachon`,
      DataReservationAndSheet,
      headers
    )
    .then((response) => {
      const data = response.data
      return data
    })
    .catch((err) => {
      const fault = err.data
      return fault
    })
}

export const addNewReservationToGoogleSheet =
  (reservation) => async (dispatch) => {
    dispatch({ type: REQUEST_ADD_RESERVATION_TO_GOOGLE_SHEET })

    try {
      const addSuccessfully = apiAddReservationGoogleSheet(reservation)

      await dispatch({
        type: SUCCESS_ADD_RESERVATION_TO_GOOGLE_SHEET,
        payload: addSuccessfully,
      })
    } catch (error) {
      await dispatch({
        type: FAILURE_ADD_RESERVATION_TO_GOOGLE_SHEET,
        payload: error,
      })
    }
  }

export const testReservationGoogleSheet = () => async (dispatch) => {
  dispatch({
    type: REQUEST_UPDATE_RESERVATION_TO_GOOGLE_SHEET,
  })

  const id = 'kjrbvijerbi'

  const DataReservationAndSheet = JSON.stringify({ name: 'hola' })

  await axios
    .put(
      `https://api-to-sheet.netlify.app/.netlify/functions/next_api_googlesheet_reservationid?reservationId=${id}`,
      DataReservationAndSheet
    )
    .then(async (snap) => {
      const data = await snap.data

      dispatch({
        type: SUCCESS_UPDATE_RESERVATION_TO_GOOGLE_SHEET,
        payload: data,
      })
    })
    .catch(async (err) => {
      const fault = await err.data
      dispatch({
        type: FAILURE_UPDATE_RESERVATION_TO_GOOGLE_SHEET,
        payload: fault,
      })
    })
}

export const updateNewReservationToGoogleSheet =
  (reservationData) => async (dispatch) => {
    dispatch({
      type: REQUEST_UPDATE_RESERVATION_TO_GOOGLE_SHEET,
    })
    const DataReservationAndSheet = {
      reservation: reservationData,
      NEXT_PUBLIC_SPREADSHEET_ID_MARIACHON,
      NEXT_PUBLIC_SHEET_ID,
    }

    //        `${URL_API_MA}/api/google-sheet/${reservationData.reservationId}`,

    const headers = {
      headers: {
        Authorization: varToken,
      },
    }

    await axios
      .put(
        `https://api-to-sheet.netlify.app/.netlify/functions/next_api_googlesheet_idreservation?reservationid=${reservationData.reservationId}`,
        DataReservationAndSheet,
        headers
      )
      .then(async (response) => {
        const data = await response.data

        dispatch({
          type: SUCCESS_UPDATE_RESERVATION_TO_GOOGLE_SHEET,
          payload: data,
        })
      })
      .catch(async (err) => {
        const fault = await err.data
        dispatch({
          type: FAILURE_UPDATE_RESERVATION_TO_GOOGLE_SHEET,
          payload: fault,
        })
      })
  }

export const sendEmailReservationToCLientAndMariachi =
  (reservation) => async (dispatch) => {
    dispatch({
      type: REQUEST_SEND_EMAIL_RESERVATION,
    })

    axios
      .post(`${URL_API}/api/mailgun/send-simple`, reservation)
      .then(async (response) => {
        const data = await response.data

        dispatch({
          type: SUCCESS_SEND_EMAIL_RESERVATION,
          payload: data,
        })
      })
      .catch(async (err) => {
        const fault = await err.data
        dispatch({
          type: FAILURE_SEND_EMAIL_RESERVATION,
          payload: fault,
        })
      })
  }
