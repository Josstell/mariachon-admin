import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import { Provider } from 'react-redux'

import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { logoutUser, getUserData } from '@redux/users/users.actions'
import { SET_AUTHENTICATE } from '@redux/users/users.types'
import store from '../redux/store'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage?.FBIdToken
      console.log(token)
      if (token) {
        const decodedToken = jwtDecode(token)
        if (decodedToken.exp * 1000 < Date.now()) {
          store.dispatch(logoutUser())
          router.push('/login')
        } else {
          store.dispatch({ type: SET_AUTHENTICATE })
          axios.defaults.headers.common.Authorization = token
          store.dispatch(getUserData())
        }
      }
    }
  }, [])

  return (
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Component {...pageProps} />
      </MuiPickersUtilsProvider>
    </Provider>
  )
}

export default MyApp
