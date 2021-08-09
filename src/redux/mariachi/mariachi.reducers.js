import {
  ADD_IMAGES_FROM_DRIVER,
  ADD_VIDEOS_FROM_DRIVER,
  CLEAR_NEW_MARIACHI_DATA_LOCALSTORAGE,
  FAILURE_ADD_NEW_MARIACHI,
  LOADING_FAILURE_IMAGE_MARIACHI,
  LOADING_FAILURE_UPDATE_MARIACHI,
  LOADING_REQUEST_IMAGE_MARIACHI,
  LOADING_REQUEST_UPDATE_MARIACHI,
  LOADING_SUCCESS_IMAGE_MARIACHI,
  LOADING_SUCCESS_UPDATE_MARIACHI,
  REQUEST_ADD_NEW_MARIACHI,
  SET_ALL_MARIACHIS,
  SET_MARIACHI_TO_EDIT,
  SUCCESS_ADD_NEW_COORDINATOR_TO_MARIACHI,
  SUCCESS_ADD_NEW_MARIACHI,
  CLEAR_ADD_NEW_MARIACHI,
  ADD_NEW_MARIACHI_DATA_TO_NEW_MARIACHI,
  FORM_POSITION_ADD_MARIACHI,
  ADD_NEW_COORDINATOR_DATA_TO_NEW_MARIACHI,
  ADD_NEW_SERVICE_DATA_TO_NEW_MARIACHI,
  LOADING_SUCCESS_COORDINATOR_UPDATE_MARIACHI,
  CLEAR_DATA_UPDATE_MARIACHI,
} from './mariachi.types'

import { getClientData } from '@helpers/lib'

export const uploadMariachiImageReducer = (
  state = { loadingImageMariachi: false, error: '' },
  action
) => {
  switch (action.type) {
    case LOADING_REQUEST_IMAGE_MARIACHI:
      state = {
        loadingImageMariachi: true,
      }
      break
    case LOADING_SUCCESS_IMAGE_MARIACHI:
      state = {
        loadingImageMariachi: false,
      }
      break
    case LOADING_FAILURE_IMAGE_MARIACHI:
      state = {
        loadingImageMariachi: false,
        error: action.payload,
      }
      break
  }

  return state
}

export const allMariachisReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ALL_MARIACHIS:
      state = action.payload
      break
  }

  return state
}

export const mariachiDataToEdit = (
  state = {
    loadingCoordinator: false,
    loadingNewMariachi: false,
    goBack: false,
  },
  action
) => {
  switch (action.type) {
    case SET_MARIACHI_TO_EDIT:
      state = {
        ...state,
        mariachiToEdit: action.payload.mariachiData,
        coordinatorMarToEdit: getClientData(
          action.payload.mariachiData.coordinatorId,
          action.payload.allUsers
        ),
      }
      break
    case LOADING_REQUEST_UPDATE_MARIACHI:
      state = {
        ...state,
        loadingCoordinator: true,
        loadingNewMariachi: true,
      }
      break
    case LOADING_SUCCESS_COORDINATOR_UPDATE_MARIACHI:
      state = {
        ...state,
        loadingCoordinator: false,
        loadingNewMariachi: true,
      }
      break
    case LOADING_SUCCESS_UPDATE_MARIACHI:
      state = {
        ...state,
        loadingCoordinator: false,
        loadingNewMariachi: false,
        goBack: true,
      }
      break
    case LOADING_FAILURE_UPDATE_MARIACHI:
      state = {
        ...state,
        loadingCoordinator: false,
        loadingNewMariachi: false,
        errorUpdate: action.payload,
      }
      break
    case CLEAR_DATA_UPDATE_MARIACHI:
      state = {
        ...state,
        loadingCoordinator: false,
        loadingNewMariachi: false,
        mariachiToEdit: {},
        coordinatorMarToEdit: {},
        goBack: false,
        errorUpdate: [],
      }
      break
    default:
      break
  }
  return state
}

const initalDataMariachiNew = {
  imagesFromDrive: { images: [], imagesThum: [] },
  videosFromDrive: [],
  coordinatorData: {},
  mariachiData: {},
  serviceDat: {},
  stepForm: 0,
}

export const addNewMariachiDataLocalReducer = (
  state = initalDataMariachiNew,
  action
) => {
  switch (action.type) {
    case ADD_IMAGES_FROM_DRIVER:
      state = {
        ...state,
        imagesFromDrive: action.payload,
      }
      break
    case ADD_VIDEOS_FROM_DRIVER:
      state = {
        ...state,
        videosFromDrive: action.payload,
      }
      break

    case ADD_NEW_COORDINATOR_DATA_TO_NEW_MARIACHI:
      state = {
        ...state,
        coordinatorData: action.payload,
      }
      break
    case FORM_POSITION_ADD_MARIACHI:
      state = {
        ...state,
        stepForm: action.payload,
      }
      break
    case ADD_NEW_MARIACHI_DATA_TO_NEW_MARIACHI:
      state = {
        ...state,
        mariachiData: action.payload,
      }
      break
    case ADD_NEW_SERVICE_DATA_TO_NEW_MARIACHI:
      state = {
        ...state,
        serviceDat: action.payload,
      }
      break
    case CLEAR_NEW_MARIACHI_DATA_LOCALSTORAGE:
      state = {
        ...state,
        imagesFromDrive: { images: [], imagesThum: [] },
        videosFromDrive: [],
        coordinatorData: {},
        mariachiData: {},
        serviceDat: {},
        stepForm: 0,
      }
      break
    default:
      break
  }
  return state
}

export const addNewMariachiReducer = (
  state = {
    loadingCoordinator: false,
    loadingNewMariachi: false,
    newMariachi: {},
    errorNewMariachi: '',
    goBack: false,
  },
  action
) => {
  switch (action.type) {
    case REQUEST_ADD_NEW_MARIACHI:
      state = {
        ...state,
        loadingCoordinator: true,
        loadingNewMariachi: true,
      }
      break
    case SUCCESS_ADD_NEW_COORDINATOR_TO_MARIACHI:
      state = {
        ...state,
        loadingCoordinator: false,
        loadingNewMariachi: true,
      }

      break
    case SUCCESS_ADD_NEW_MARIACHI:
      state = {
        ...state,
        loadingCoordinator: false,
        loadingNewMariachi: false,
        newMariachi: action.payload,
        goBack: true,
      }

      break
    case FAILURE_ADD_NEW_MARIACHI:
      state = {
        ...state,
        loadingCoordinator: false,
        error: action.payload,
      }
      break
    case CLEAR_ADD_NEW_MARIACHI:
      state = {
        loadingCoordinator: false,
        loadingNewMariachi: false,
        newMariachi: {},
        errorNewMariachi: '',
        goBack: false,
      }
      break

    default:
      break
  }

  return state
}
