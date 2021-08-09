import {
  CLEAR_ALL_RESERVATIONS,
  CLEAR_ALL_RESERVATIONS_ADMIN,
  FAILURE_UPDATE_RESERVATION_BY_ID,
  GET_ALL_RESERVATIONS_ADMIN,
  GET_FAILURE_ALL_RESERVATIONS_FROM_SERVER,
  GET_REQUEST_ALL_RESERVATIONS_FROM_SERVER,
  GET_SUCCESS_ALL_RESERVATIONS_FROM_SERVER,
  REQUEST_GET_RESERVATION_BY_ID,
  REQUEST_UPDATE_RESERVATION_BY_ID,
  SET_ALL_RESERVATIONS,
  SET_RESERVATION_TO_EDIT,
  SUCCESS_UPDATE_RESERVATION_BY_ID,
  SUCCESS_GET_RESERVATION_BY_ID,
  FAILURE_GET_RESERVATION_BY_ID,
  SET_ALL_PARAMS,
  CREATE_REQUEST_NEW_RESERVATION,
  ADD_NEW_CLIENT_REQUEST_NEW_RESERVATION,
  ADD_NEW_CLIENT_SUCCESS_NEW_RESERVATION,
  SUCCESS_REQUEST_NEW_RESERVATION,
  FAILURE_REQUEST_NEW_RESERVATION,
  ADD_NEW_CLIENT_FAILURE_NEW_RESERVATION,
  SUCCESS_SEND_WHATSAPP_TO_COORDINATOR,
  REQUEST_SEND_WHATSAPP_TO_COORDINATOR,
  CLEAR_GESTION_RESERVATIONS,
  REQUEST_ADD_RESERVATION_TO_GOOGLE_SHEET,
  SUCCESS_ADD_RESERVATION_TO_GOOGLE_SHEET,
  FAILURE_ADD_RESERVATION_TO_GOOGLE_SHEET,
  REQUEST_UPDATE_RESERVATION_TO_GOOGLE_SHEET,
  SUCCESS_UPDATE_RESERVATION_TO_GOOGLE_SHEET,
  FAILURE_UPDATE_RESERVATION_TO_GOOGLE_SHEET,
  FAILURE_UPDATE_STATE_GESTION_RESERVATIONS,
  SUCCESS_UPDATE_STATE_GESTION_RESERVATIONS,
  REQUEST_UPDATE_STATE_GESTION_RESERVATIONS,
  SAVE_RESERVATION_UPDATE,
  FAILURE_SEND_EMAIL_RESERVATION,
  SUCCESS_SEND_EMAIL_RESERVATION,
  REQUEST_SEND_EMAIL_RESERVATION,
} from './reservations.types'

import { getClientData, getMariachiData } from '@helpers/lib'

// const getClientData = (userId, allUsers) => {
//   const userData = allUsers.find((user) => user.userId === userId)
//   return {
//     clientId: userData.userId,
//     nameClient: userData.fullName,
//     phone: userData.phone,
//     email: userData.email,
//   }
// }

export const allReservationsReducerFromServer = (
  state = { loadingAllResFromServer: false, errorAllResFromServer: '' },
  action
) => {
  switch (action.type) {
    case GET_REQUEST_ALL_RESERVATIONS_FROM_SERVER:
      state = {
        ...state,
        loadingAllResFromServer: true,
        errorAllResFromServer: '',
      }
      break
    case GET_SUCCESS_ALL_RESERVATIONS_FROM_SERVER:
      state = {
        ...state,
        loadingAllResFromServer: false,
      }
      break
    case GET_FAILURE_ALL_RESERVATIONS_FROM_SERVER:
      state = {
        ...state,
        loadingAllResFromServer: false,
        errorAllResFromServer: action.payload,
      }
      break
    default:
      break
  }
  return state
}

export const allReservationsReducer = (state = [], action) => {
  switch (action.type) {
    case CLEAR_ALL_RESERVATIONS:
      state = []
      break
    case SET_ALL_RESERVATIONS:
      state = action.payload
      break
    default:
      break
  }

  return state
}

export const allReservationsAdminReducer = (state = [], action) => {
  const reservationData = []
  switch (action.type) {
    case CLEAR_ALL_RESERVATIONS_ADMIN:
      state = []
      break

    case GET_ALL_RESERVATIONS_ADMIN:
      // eslint-disable-next-line no-case-declarations
      const reservation = action.payload.allReservations
      reservation.forEach((reserva) => {
        reservationData.push({
          reservationId: reserva.reservationId,
          price: reserva.price,
          date: reserva.date,
          service: reserva.service,
          status: reserva.status,
          createdBy: reserva.createdBy,
          address: reserva.address,
          deposit: reserva.deposit,
          message: reserva.message,
          playlist: reserva.playlist,
          qty: reserva.qty,
          mariachiData: getMariachiData(
            reserva.mariachiId,
            action.payload.allMariachis
          ),
          client: getClientData(reserva.clientId, action.payload.allUsers),
          coordinatorData: getClientData(
            reserva.coordinatorId,
            action.payload.allUsers
          ),
        })
      })

      state = reservationData

      break
    default:
      break
  }

  return state
}

export const reservationDataToEdit = (state = {}, action) => {
  switch (action.type) {
    case SET_RESERVATION_TO_EDIT:
      state = action.payload
      break
    default:
      break
  }
  return state
}

export const reservationGetByIdToEdit = (
  state = {
    reservationById: {},
    loadingResetationById: false,
    errorGetById: '',
  },
  action
) => {
  switch (action.type) {
    case REQUEST_GET_RESERVATION_BY_ID:
      state = {
        ...state,
        loadingResetationById: true,
      }
      break

    case SUCCESS_GET_RESERVATION_BY_ID:
      state = {
        ...state,
        loadingResetationById: false,
        reservationById: action.payload,
      }
      break

    case FAILURE_GET_RESERVATION_BY_ID:
      state = {
        ...state,
        loadingResetationById: false,
        errorGetById: action.payload,
      }
      break

    default:
      break
  }

  return state
}

export const reservationUpdatedById = (
  state = { loadingUpdatedById: false, success: '', errorUpdatedById: '' },
  action
) => {
  switch (action.type) {
    case REQUEST_UPDATE_RESERVATION_BY_ID:
      state = {
        ...state,
        loadingUpdatedById: true,
      }

      break
    case SUCCESS_UPDATE_RESERVATION_BY_ID:
      state = {
        ...state,
        loadingUpdatedById: false,
        success: action.payload,
      }
      break

    case FAILURE_UPDATE_RESERVATION_BY_ID:
      state = {
        ...state,
        loadingUpdatedById: false,
        success: '',
        errorUpdatedById: action.payload,
      }
      break

    default:
      break
  }

  return state
}

export const paramsReservations = (state = {}, action) => {
  switch (action.type) {
    case SET_ALL_PARAMS:
      state = action.payload

      break

    default:
      break
  }
  return state
}

export const createNewReservationReducer = (
  state = { loadingNewReservation: false, loadingNeWClient: false, error: [] },
  action
) => {
  switch (action.type) {
    case CREATE_REQUEST_NEW_RESERVATION:
      state = {
        ...state,
        loadingNewReservation: true,
      }
      break
    case ADD_NEW_CLIENT_REQUEST_NEW_RESERVATION:
      state = {
        ...state,
        loadingNeWClient: true,
      }
      break
    case ADD_NEW_CLIENT_SUCCESS_NEW_RESERVATION:
      state = {
        ...state,
        loadingNeWClient: false,
      }
      break
    case SUCCESS_REQUEST_NEW_RESERVATION:
      state = {
        ...state,
        loadingNewReservation: false,
        loadingNeWClient: false,
      }
      break
    case FAILURE_REQUEST_NEW_RESERVATION:
      state = {
        ...state,
        loadingNewReservation: false,
        loadingNeWClient: false,
        error: action.payload,
      }
      break
    case ADD_NEW_CLIENT_FAILURE_NEW_RESERVATION:
      state = {
        ...state,
        loadingNewReservation: false,
        loadingNeWClient: false,
        error: action.payload,
      }
      break

    default:
      break
  }

  return state
}

export const reservationGestionWhatsAppEmail = (
  state = {
    url: '',
    loadingWhatsApp: false,
    loadingUpdateStatus: false,
    error: '',
  },
  action
) => {
  switch (action.type) {
    case REQUEST_SEND_WHATSAPP_TO_COORDINATOR:
      state = {
        ...state,
        loadingWhatsApp: true,
      }
      break
    case SUCCESS_SEND_WHATSAPP_TO_COORDINATOR:
      state = {
        ...state,
        loadingWhatsApp: false,
        url: action.payload,
      }
      break

    case CLEAR_GESTION_RESERVATIONS:
      state = {
        ...state,
        url: '',
        loadingWhatsApp: false,
      }
      break
    case REQUEST_UPDATE_STATE_GESTION_RESERVATIONS:
      state = {
        ...state,
        loadingUpdateStatus: true,
      }
      break
    case SUCCESS_UPDATE_STATE_GESTION_RESERVATIONS:
      state = {
        ...state,
        loadingUpdateStatus: false,
      }
      break
    case FAILURE_UPDATE_STATE_GESTION_RESERVATIONS:
      state = {
        ...state,
        error: action.payload,
      }
      break

    case SAVE_RESERVATION_UPDATE:
      state = {
        ...state,
        reservationGestion: action.payload,
      }
      break

    default:
      break
  }
  return state
}

export const addReservationToGoogleSheetReducer = (
  state = {
    loadingAddResToGoogleSheet: false,
    success: 'nada',
    error: 'sin error',
  },
  action
) => {
  switch (action.type) {
    case REQUEST_ADD_RESERVATION_TO_GOOGLE_SHEET:
      state = {
        ...state,
        loadingAddResToGoogleSheet: true,
      }
      break

    case SUCCESS_ADD_RESERVATION_TO_GOOGLE_SHEET:
      state = {
        ...state,
        loadingAddResToGoogleSheet: false,
        success: action.payload,
      }
      break
    case FAILURE_ADD_RESERVATION_TO_GOOGLE_SHEET:
      state = {
        ...state,
        loadingAddResToGoogleSheet: false,
        error: action.payload,
      }
      break

    default:
      break
  }
  return state
}

export const updateReservationToGoogleSheetReducer = (
  state = {
    loadingUpdateResToGoogleSheet: false,
    success: '',
    error: '',
  },
  action
) => {
  switch (action.type) {
    case REQUEST_UPDATE_RESERVATION_TO_GOOGLE_SHEET:
      state = {
        ...state,
        loadingUpdateResToGoogleSheet: true,
      }
      break
    case SUCCESS_UPDATE_RESERVATION_TO_GOOGLE_SHEET:
      state = {
        ...state,
        loadingUpdateResToGoogleSheet: false,
        success: action.payload,
      }
      break
    case FAILURE_UPDATE_RESERVATION_TO_GOOGLE_SHEET:
      state = {
        ...state,
        loadingUpdateResToGoogleSheet: false,
        error: action.payload,
      }
      break

    default:
      break
  }
  return state
}

export const sendEmailReservationToCLientAndMariachiReducer = (
  state = { loadingSendEmail: false, message: '', error: '' },
  action
) => {
  switch (action.type) {
    case REQUEST_SEND_EMAIL_RESERVATION:
      state = {
        ...state,
        loadingSendEmail: true,
      }

      break
    case SUCCESS_SEND_EMAIL_RESERVATION:
      state = {
        ...state,
        loadingSendEmail: false,
        message: action.payload,
      }

      break

    case FAILURE_SEND_EMAIL_RESERVATION:
      state = {
        ...state,
        loadingSendEmail: false,
        error: action.payload,
      }

      break

    default:
      break
  }
  return state
}
