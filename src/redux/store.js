import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import usersReducer, {
  allUsersReducer,
  optionAdmin,
  userDataToEdit,
  setAddNewUserReducer,
} from '@redux/users/users.reducers'
import {
  addReservationToGoogleSheetReducer,
  allReservationsAdminReducer,
  allReservationsReducer,
  allReservationsReducerFromServer,
  createNewReservationReducer,
  paramsReservations,
  reservationDataToEdit,
  reservationGestionWhatsAppEmail,
  reservationGetByIdToEdit,
  reservationUpdatedById,
  sendEmailReservationToCLientAndMariachiReducer,
  updateReservationToGoogleSheetReducer,
} from '@redux/reservations/reservations.reducers'
import {
  addNewMariachiReducer,
  allMariachisReducer,
  mariachiDataToEdit,
  uploadMariachiImageReducer,
  addNewMariachiDataLocalReducer,
} from '@redux/mariachi/mariachi.reducers'

const initialState = {}

const reducers = combineReducers({
  optionUserAd: optionAdmin,
  users: usersReducer,
  allUsers: allUsersReducer,
  userToEdit: userDataToEdit,
  userAddNew: setAddNewUserReducer,
  allReservations: allReservationsReducer,
  allReservationsAdmin: allReservationsAdminReducer,
  allReservationsAdminAPI: allReservationsReducerFromServer,
  reservationToEdit: reservationDataToEdit,
  reservationGetByIdAPIToEdit: reservationGetByIdToEdit,
  reservationUpdatedByIdAPITo: reservationUpdatedById,
  createNewReservation: createNewReservationReducer,
  parameterForReservations: paramsReservations,
  uploadMariachiImage: uploadMariachiImageReducer,
  allMariachis: allMariachisReducer,
  mariachiToEdit: mariachiDataToEdit,
  NewMariachi: addNewMariachiReducer,
  addMariachiDataLocal: addNewMariachiDataLocalReducer,
  gestionReservationWhatsEmail: reservationGestionWhatsAppEmail,
  addReservationToGoogleSheet: addReservationToGoogleSheetReducer,
  updateReservationToGoogleSheet: updateReservationToGoogleSheetReducer,
  sendEmailReservationToCLientAndMariachi:
    sendEmailReservationToCLientAndMariachiReducer,
})

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store
