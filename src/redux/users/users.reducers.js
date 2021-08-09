const {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  SET_AUTHENTICATE,
  SET_UNAUTHENTICATE,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  LOADING_FAILURE_IMAGE_USER,
  LOADING_SUCCESS_IMAGE_USER,
  LOADING_REQUEST_IMAGE_USER,
  LOADING_REQUEST_UPDATE_USER,
  LOADING_SUCCESS_UPDATE_USER,
  LOADING_FAILURE_UPDATE_USER,
  SET_ALL_USERS,
  SET_USER_TO_EDIT,
  SET_OPTION_ADMIN,
  LOADING_FAILURE_IMAGE_USER_ADMIN,
  LOADING_SUCCESS_IMAGE_USER_ADMIN,
  LOADING_REQUEST_IMAGE_USER_ADMIN,
  CLEAR_ADD_NEW_USER,
  SET_ADD_NEW_USER,
  USER_SIGNUP_GOOGLE_REQUEST,
  USER_SIGNUP_GOOGLE_SUCCESS,
  USER_SIGNUP_GOOGLE_FAILURE,
  USER_SIGNUP_FACEBOOK_REQUEST,
  USER_SIGNUP_FACEBOOK_SUCCESS,
  USER_SIGNUP_FACEBOOK_FAILURE,
} = require('./users.types')

const initialState = {
  authenticated: false,
  loading: false,
  loadingUser: false,
  loadingImage: false,
  credentials: {},
  error: '',
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATE:
      state = {
        ...state,
        authenticated: true,
      }
      break
    case SET_UNAUTHENTICATE:
      state = initialState
      break
    case USER_LOGIN_REQUEST:
      state = {
        ...state,
        authenticated: false,
        loading: true,
      }
      break
    case USER_LOGIN_SUCCESS:
      state = {
        ...state,
        authenticated: true,
        loading: false,
      }
      break
    case USER_LOGIN_FAILURE:
      state = {
        ...state,
        authenticated: false,
        loading: false,
        error: action.payload,
      }
      break

    case USER_SIGNUP_REQUEST:
      state = {
        ...state,
        authenticated: false,
        loading: true,
      }
      break
    case USER_SIGNUP_GOOGLE_REQUEST:
      state = {
        ...state,
        authenticated: false,
        loading: true,
      }
      break

    case USER_SIGNUP_GOOGLE_SUCCESS:
      state = {
        ...state,
        loading: false,
        userGoogle: action.payload,
      }
      break

    case USER_SIGNUP_GOOGLE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload,
      }
      break
    case USER_SIGNUP_FACEBOOK_REQUEST:
      state = {
        ...state,
        authenticated: false,
        loading: true,
      }
      break

    case USER_SIGNUP_FACEBOOK_SUCCESS:
      state = {
        ...state,
        loading: false,
        userFacebook: action.payload,
      }
      break

    case USER_SIGNUP_FACEBOOK_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload,
      }
      break

    case USER_SIGNUP_SUCCESS:
      state = {
        ...state,
        authenticated: true,
        loading: false,
      }
      break
    case USER_SIGNUP_FAILURE:
      state = {
        ...state,
        authenticated: false,
        loading: false,
        error: action.payload,
      }
      break

    case GET_USER_REQUEST:
      state = {
        ...state,
        authenticated: true,
        loading: false,
        loadingUser: true,
      }
      break
    case GET_USER_SUCCESS:
      state = {
        ...state,
        authenticated: true,
        loading: false,
        loadingUser: false,
        credentials: action.payload,
        error: '',
      }
      break
    case GET_USER_FAILURE:
      state = {
        ...state,
        authenticated: false,
        loading: false,
        loadingUser: false,
        loadingImage: false,
        credentials: {},
        error: action.payload,
      }
      break

    case LOADING_REQUEST_IMAGE_USER:
      state = {
        ...state,
        loadingImage: true,
      }
      break
    case LOADING_SUCCESS_IMAGE_USER:
      state = {
        ...state,
        loadingImage: false,
      }
      break
    case LOADING_FAILURE_IMAGE_USER:
      state = {
        ...state,
        loadingImage: false,
        error: action.payload,
      }
      break

    case LOADING_REQUEST_IMAGE_USER_ADMIN:
      state = {
        ...state,
        loadingImageAdmin: true,
      }
      break
    case LOADING_SUCCESS_IMAGE_USER_ADMIN:
      state = {
        ...state,
        loadingImageAdmin: false,
      }
      break
    case LOADING_FAILURE_IMAGE_USER_ADMIN:
      state = {
        ...state,
        loadingImageAdmin: false,
        error: action.payload,
      }
      break
    case LOADING_REQUEST_UPDATE_USER:
      state = {
        ...state,
        loadingUser: true,
      }
      break
    case LOADING_SUCCESS_UPDATE_USER:
      state = {
        ...state,
        loadingUser: false,
      }
      break
    case LOADING_FAILURE_UPDATE_USER:
      state = {
        ...state,
        loadingUser: false,
        error: action.payload,
      }
      break
  }
  return state
}

export const allUsersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ALL_USERS:
      state = action.payload
      break
  }

  return state
}

export const userDataToEdit = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_TO_EDIT:
      state = action.payload
      break
  }
  return state
}

export const optionAdmin = (state = 1, action) => {
  switch (action.type) {
    case SET_OPTION_ADMIN:
      state = action.payload
      break
    default:
      break
  }
  return state
}

export const setAddNewUserReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ADD_NEW_USER:
      state = action.payload
      break
    case CLEAR_ADD_NEW_USER:
      state = {}
      break
    default:
      break
  }
  return state
}

export default usersReducer
