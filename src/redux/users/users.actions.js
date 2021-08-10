import axios from 'axios'

import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOADING_FAILURE_IMAGE_USER,
  LOADING_FAILURE_UPDATE_USER,
  LOADING_REQUEST_IMAGE_USER,
  LOADING_REQUEST_UPDATE_USER,
  LOADING_SUCCESS_IMAGE_USER,
  LOADING_SUCCESS_UPDATE_USER,
  SET_ALL_USERS,
  SET_OPTION_ADMIN,
  SET_UNAUTHENTICATE,
  SET_USER_TO_EDIT,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  LOADING_REQUEST_IMAGE_USER_ADMIN,
  LOADING_SUCCESS_IMAGE_USER_ADMIN,
  LOADING_FAILURE_IMAGE_USER_ADMIN,
  USER_SIGNUP_FAILURE,
  CLEAR_ADD_NEW_USER,
  SET_ADD_NEW_USER,
} from './users.types'

const URL_API = process.env.NEXT_PUBLIC_URL_API

export const getAllUsersLocally = () => async (dispatch) => {
  const resUsers = await axios.get(`${URL_API}/api/user/get/all?role=admin`)

  const users = await resUsers.data

  dispatch(setAllUsers(users))
}

export const loginUser = (userData) => (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST })

  axios
    .post(`${URL_API}/api/login`, userData)
    .then((snap) => {
      setAuthorizationHeader(snap.data.token)
    })
    .then(() => {
      return dispatch(getUserData())
    })
    .then(() => {
      dispatch({ type: USER_LOGIN_SUCCESS })
    })
    .catch((err) => {
      dispatch({
        type: USER_LOGIN_FAILURE,
        payload: { error: err },
      })
    })
}

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`
  localStorage.setItem('FBIdToken', FBIdToken)
  axios.defaults.headers.common.Authorization = FBIdToken
}

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken')
  localStorage.removeItem('userRole')

  delete axios.defaults.headers.common.Authorization

  dispatch({
    type: SET_UNAUTHENTICATE,
  })
}

export const getUserData = () => (dispatch) => {
  dispatch({ type: GET_USER_REQUEST })
  axios
    .get(`${URL_API}/api/user/get`)
    .then((res) => {
      localStorage.setItem('userRole', res.data.userCredentials.role)
      dispatch({
        type: GET_USER_SUCCESS,
        payload: res.data.userCredentials,
      })
    })
    .catch((err) =>
      dispatch({
        type: GET_USER_FAILURE,
        payload: {
          error: err,
        },
      })
    )
}

export const signupUser = (newUserData) => (dispatch) => {
  const { role, admin } = newUserData
  dispatch({ type: USER_SIGNUP_REQUEST })

  if (role === 'client') {
    axios
      .post(`${URL_API}/api/signup/client`, newUserData)
      .then(async (res) => {
        if (!admin) {
          setAuthorizationHeader(res.data.token)
          dispatch(getUserData())
        } else {
          dispatch(getAllUsersLocally())
        }
      })
      .then(() => {
        dispatch({
          type: USER_SIGNUP_SUCCESS,
        })
      })
      .catch((err) => {
        dispatch({
          type: USER_SIGNUP_FAILURE,
          payload: err,
        })
      })
  } else if (role === 'admin') {
    axios
      .post(`${URL_API}/api/signup/admin`, newUserData)
      .then((res) => {
        if (!admin) {
          setAuthorizationHeader(res.data.token)
          dispatch(getUserData())
        } else {
          dispatch(getAllUsersLocally())
        }
      })
      .then(() => {
        dispatch({
          type: USER_SIGNUP_SUCCESS,
        })
      })
      .catch((err) => {
        dispatch({
          type: USER_SIGNUP_FAILURE,
          payload: err,
        })
      })
  } else if (role === 'mariachi' || role === 'coordinator') {
    axios
      .post(`${URL_API}/api/signup/mariachi`, newUserData)
      .then((res) => {
        if (!admin) {
          setAuthorizationHeader(res.data.token)
          dispatch(getUserData())
        } else {
          dispatch(getAllUsersLocally())
        }
      })
      .then(() => {
        dispatch({
          type: USER_SIGNUP_SUCCESS,
        })
      })
      .catch((err) => {
        dispatch({
          type: USER_SIGNUP_FAILURE,
          payload: err,
        })
      })
  }
}

export const uploadImage = (formData, IdUser) => (dispatch) => {
  dispatch({ type: LOADING_REQUEST_IMAGE_USER })
  axios
    .post(`${URL_API}/api/upload/avatar/${IdUser}`, formData)
    .then(() => {
      dispatch({ type: LOADING_SUCCESS_IMAGE_USER })
    })
    .then(() => {
      dispatch(getUserData())
    })
    .catch((err) =>
      dispatch({
        type: LOADING_FAILURE_IMAGE_USER,
        payload: err.response.data,
      })
    )
}

export const uploadImageAdmin = (formData, IdUser) => (dispatch) => {
  dispatch({ type: LOADING_REQUEST_IMAGE_USER_ADMIN })
  axios
    .post(`${URL_API}/api/upload/avatar/${IdUser}`, formData)
    .then(async () => {
      dispatch({ type: LOADING_SUCCESS_IMAGE_USER_ADMIN })

      const resUsers = await axios.get(`${URL_API}/api/user/get/all?role=admin`)

      const users = await resUsers.data

      return dispatch(setAllUsers(users))
    })
    .then(() => {
      dispatch(setUsertoEdit(IdUser))
    })
    .catch((err) =>
      dispatch({
        type: LOADING_FAILURE_IMAGE_USER_ADMIN,
        payload: err.response.data,
      })
    )
}

export const editUserDetails = (userDetails, userId) => (dispatch) => {
  dispatch({ type: LOADING_REQUEST_UPDATE_USER })
  axios
    .post(`${URL_API}/api/user/update/${userId}`, userDetails)
    .then(() => {
      dispatch({ type: LOADING_SUCCESS_UPDATE_USER })
      dispatch(getUserData())
    })
    .catch((err) => {
      dispatch({
        type: LOADING_FAILURE_UPDATE_USER,
        payload: err.response.data,
      })
    })
}

export const editUserDetailsAdmin = (userDetails, userId) => (dispatch) => {
  dispatch({ type: LOADING_REQUEST_UPDATE_USER })
  axios
    .post(`${URL_API}/api/user/update/${userId}`, userDetails)
    .then(async () => {
      const resUsers = await axios.get(`${URL_API}/api/user/get/all?role=admin`)
      const users = await resUsers.data

      return dispatch(setAllUsers(users))
    })
    .then(() => {
      dispatch(setUsertoEdit(userId))
      dispatch({ type: LOADING_SUCCESS_UPDATE_USER })
    })
    .catch((err) => {
      dispatch({
        type: LOADING_FAILURE_UPDATE_USER,
        payload: err,
      })
    })
}

export const setAllUsers = (users) => (dispatch) => {
  dispatch({
    type: SET_ALL_USERS,
    payload: users,
  })
}

export const setUsertoEdit = (userId) => (dispatch, getSate) => {
  const { allUsers } = getSate()
  let userData = allUsers.find((user) => user.userId === userId)

  if (userData === undefined) {
    userData = null
  }

  dispatch({
    type: SET_USER_TO_EDIT,
    payload: userData,
  })
}

export const handleImagePicture = () => () => {
  const fileInput = document.getElementById('imageInput')
  fileInput.click()
}

export const handleImageChange = (e, IdUser) => (dispatch) => {
  const image = e.target.files[0]

  const formData = new FormData()
  formData.append('image', image, image.name)

  dispatch(uploadImage(formData, IdUser))
}

export const handleImageChangeAdmin = (e, IdUser) => (dispatch) => {
  const image = e.target.files[0]

  const formData = new FormData()
  formData.append('image', image, image.name)

  dispatch(uploadImageAdmin(formData, IdUser))
}

export const setOptionToAdmin = (option) => (dispatch) => {
  dispatch({
    type: SET_OPTION_ADMIN,
    payload: option,
  })
}

export const setAddNewUser = (newUser) => (dispatch) => {
  dispatch({
    type: SET_ADD_NEW_USER,
    payload: newUser,
  })
}

export const clearAddNewUser = () => (dispatch) => {
  dispatch({
    type: CLEAR_ADD_NEW_USER,
  })
}

// export const  signupUserWithGoogle = (role)=>async (dispatch)=>{
//   dispatch({
//     type: USER_SIGNUP_GOOGLE_REQUEST
//   })

//   try {
//     const userGoogle =  await signInWithGoogle()
//     userGoogle.user.role=role
//     dispatch({
//       type: USER_SIGNUP_GOOGLE_SUCCESS,
//       payload: userGoogle,
//     })

//   } catch (error) {
//      dispatch({
//       type: USER_SIGNUP_GOOGLE_FAILURE,
//       payload: error,
//     })
//   }

// }

export const signupUserProvider = (newUserData) => (dispatch) => {
  const { user, token } = newUserData
  dispatch({ type: USER_SIGNUP_REQUEST })

  if (user.role === 'client') {
    axios
      .post(`${URL_API}/api/user/add-provider`, user)
      .then(async (res) => {
        if (!res.data.user) {
          dispatch(getAllUsersLocally())
        }
      })
      .then(() => {
        dispatch({
          type: USER_SIGNUP_SUCCESS,
        })
      })
      .catch((err) => {
        dispatch({
          type: USER_SIGNUP_FAILURE,
          payload: err,
        })
      })
  } else if (user.role === 'admin') {
    axios
      .post(`${URL_API}/api/user/add-provider`, user)
      .then((res) => {
        setAuthorizationHeader(token.i)
        dispatch(getUserData())
        if (!res.data.user) {
          dispatch(getAllUsersLocally())
        }
      })
      .then(() => {
        dispatch({
          type: USER_SIGNUP_SUCCESS,
        })
      })
      .catch((err) => {
        dispatch({
          type: USER_SIGNUP_FAILURE,
          payload: err,
        })
      })
  } else if (user.role === 'mariachi' || user.role === 'coordinator') {
    axios
      .post(`${URL_API}/api/user/add-provider`, newUserData)
      .then((res) => {
        if (!res.data.user) {
          dispatch(getAllUsersLocally())
        }
      })
      .then(() => {
        dispatch({
          type: USER_SIGNUP_SUCCESS,
        })
      })
      .catch((err) => {
        dispatch({
          type: USER_SIGNUP_FAILURE,
          payload: err,
        })
      })
  }
}
