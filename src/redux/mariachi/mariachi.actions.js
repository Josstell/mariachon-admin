import { getAllUsersLocally, getUserData } from '@redux/users/users.actions'
import axios from 'axios'

import {
  ADD_IMAGES_FROM_DRIVER,
  ADD_VIDEOS_FROM_DRIVER,
  ADD_NEW_COORDINATOR_DATA_TO_NEW_MARIACHI,
  FORM_POSITION_ADD_MARIACHI,
  CLEAR_NEW_MARIACHI_DATA_LOCALSTORAGE,
  LOADING_FAILURE_IMAGE_MARIACHI,
  LOADING_FAILURE_UPDATE_MARIACHI,
  LOADING_REQUEST_IMAGE_MARIACHI,
  LOADING_REQUEST_UPDATE_MARIACHI,
  LOADING_SUCCESS_IMAGE_MARIACHI,
  LOADING_SUCCESS_UPDATE_MARIACHI,
  SET_ALL_MARIACHIS,
  SET_MARIACHI_TO_EDIT,
  REQUEST_ADD_NEW_MARIACHI,
  ADD_NEW_MARIACHI_DATA_TO_NEW_MARIACHI,
  FAILURE_ADD_NEW_MARIACHI,
  SUCCESS_ADD_NEW_MARIACHI,
  ADD_NEW_SERVICE_DATA_TO_NEW_MARIACHI,
  SUCCESS_ADD_NEW_COORDINATOR_TO_MARIACHI,
  LOADING_SUCCESS_COORDINATOR_UPDATE_MARIACHI,
} from './mariachi.types'

const URL_API = process.env.NEXT_PUBLIC_URL_API

export const uploadImageMariachi =
  (formData, mariachiId) => (dispatch, getSate) => {
    dispatch({ type: LOADING_REQUEST_IMAGE_MARIACHI })
    axios
      .post(`${URL_API}/api/upload/${mariachiId}`, formData)
      .then(async () => {
        const resMariachis = await axios.get(`${URL_API}/api/mariachi/get/all`)
        const mariachis = await resMariachis.data
        return dispatch(setAllMariachis(mariachis))
      })
      .then(() => {
        const { allMariachis } = getSate()
        const mariachiData = allMariachis.filter(
          (maria) => maria.mariachiId === mariachiId
        )[0]
        dispatch(setMariachiToEdit(mariachiData))
      })
      .then(() => {
        dispatch({ type: LOADING_SUCCESS_IMAGE_MARIACHI })
      })
      .catch((err) =>
        dispatch({
          type: LOADING_FAILURE_IMAGE_MARIACHI,
          payload: err,
        })
      )
  }

export const setAllMariachis = (mariachis) => (dispatch) => {
  dispatch({
    type: SET_ALL_MARIACHIS,
    payload: mariachis,
  })
}

export const setMariachiToEdit = (mariachiData) => (dispatch, getSate) => {
  const { allUsers } = getSate()
  dispatch({
    type: SET_MARIACHI_TO_EDIT,
    payload: { mariachiData, allUsers },
  })
}

export const handleImageChangeMariachiLogo = (e, mariachiId) => (dispatch) => {
  const image = e.target.files[0]

  const formData = new FormData()
  formData.append('image', image, image.name)

  dispatch(uploadImageMariachi(formData, mariachiId))
}

export const editMariachiDetails = () => (dispatch, getSate) => {
  const { addMariachiDataLocal, mariachiToEdit } = getSate()

  const {
    coordinatorData,
    mariachiData,
    videosFromDrive,
    imagesFromDrive,
    serviceDat,
  } = addMariachiDataLocal

  const updateUser = coordinatorData

  updateUser.role = 'coordinator'
  updateUser.enable = true
  updateUser.state = ''
  updateUser.admin = true // to add data "fullName, phone, instruments"

  const updateMariachi = {
    name: mariachiData.nameMariachi,
    description: mariachiData.description,
    service_price: serviceDat,
    images: imagesFromDrive,
    videos: videosFromDrive,
    userName: coordinatorData.userName,
  }

  dispatch({ type: LOADING_REQUEST_UPDATE_MARIACHI })

  axios
    .post(
      `${URL_API}/api/user/update/${mariachiToEdit.mariachiToEdit.coordinatorId}`,
      updateUser
    )
    .then(() => {
      dispatch({ type: LOADING_SUCCESS_COORDINATOR_UPDATE_MARIACHI })
      dispatch(getUserData())
      return axios.post(
        `${URL_API}/api/mariachi/update/${mariachiToEdit.mariachiToEdit.mariachiId}`,
        updateMariachi
      )
    })
    .then(async () => {
      const resMariachis = await axios.get(`${URL_API}/api/mariachi/get/all`)
      const mariachis = await resMariachis.data
      return dispatch(setAllMariachis(mariachis))
    })
    .then(() => {
      dispatch({ type: LOADING_SUCCESS_UPDATE_MARIACHI })
    })
    .catch((err) =>
      dispatch({
        type: LOADING_FAILURE_UPDATE_MARIACHI,
        payload: err.response.data,
      })
    )
}

export const addImagesFromDrive = (images) => (dispatch) => {
  dispatch({
    type: ADD_IMAGES_FROM_DRIVER,
    payload: images,
  })
}

export const addVideosFromDrive = (videos) => (dispatch) => {
  dispatch({
    type: ADD_VIDEOS_FROM_DRIVER,
    payload: videos,
  })
}

export const addCoordinatorToNewMariachi = (coordinator) => (dispatch) => {
  dispatch({
    type: ADD_NEW_COORDINATOR_DATA_TO_NEW_MARIACHI,
    payload: coordinator,
  })
}

export const addMariachiToNewmariachi = (mariachiData) => (dispatch) => {
  dispatch({
    type: ADD_NEW_MARIACHI_DATA_TO_NEW_MARIACHI,
    payload: mariachiData,
  })
}

export const addServiceToNewMariachi = (service) => (dispatch) => {
  dispatch({
    type: ADD_NEW_SERVICE_DATA_TO_NEW_MARIACHI,
    payload: service,
  })
}

export const formPositionAddMariachi = (step) => (dispatch) => {
  dispatch({
    type: FORM_POSITION_ADD_MARIACHI,
    payload: step,
  })
}

export const clearNewMariachiDataLocalStorage = () => (dispatch) => {
  dispatch({
    type: CLEAR_NEW_MARIACHI_DATA_LOCALSTORAGE,
  })
}

export const addNewMariachi = () => (dispatch, getSate) => {
  const { allMariachis, addMariachiDataLocal } = getSate()

  const {
    coordinatorData,
    mariachiData,
    videosFromDrive,
    imagesFromDrive,
    serviceDat,
  } = addMariachiDataLocal

  const newUser = coordinatorData
  newUser.password = '123456'
  newUser.confirmPassword = '123456'
  newUser.role = 'coordinator'
  newUser.admin = true // to add data "fullName, phone, instruments"

  const addNewMariachi = {
    name: mariachiData.nameMariachi,
    description: mariachiData.description,
    service_price: serviceDat,
    images: imagesFromDrive,
    videos: videosFromDrive,
    userName: coordinatorData.userName,
  }

  dispatch({
    type: REQUEST_ADD_NEW_MARIACHI,
  })

  axios
    .post(`${URL_API}/api/signup/mariachi`, newUser)
    .then((respon) => {
      addNewMariachi.coordinatorId = respon.data.userId
      return dispatch(getAllUsersLocally())
    })
    .then(() => {
      dispatch({
        type: SUCCESS_ADD_NEW_COORDINATOR_TO_MARIACHI,
      })
      return axios
        .post(`${URL_API}/api/newmariachi`, addNewMariachi)
        .then((respon) => {
          return respon.data
        })
        .catch((err) => {
          dispatch({
            type: FAILURE_ADD_NEW_MARIACHI,
            payload: err,
          })
        })
    })
    .then(async (mariachiAdded) => {
      dispatch({
        type: SUCCESS_ADD_NEW_MARIACHI,
        payload: mariachiAdded,
      })
      let mariachis = []
      mariachis = allMariachis
      mariachis.push(mariachiAdded)
      dispatch(setAllMariachis(mariachis))

      return await dispatch({ type: CLEAR_NEW_MARIACHI_DATA_LOCALSTORAGE })
    })
    .catch((err) => {
      dispatch({
        type: FAILURE_ADD_NEW_MARIACHI,
        payload: err,
      })
    })
}
