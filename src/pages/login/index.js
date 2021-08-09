import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LogoMariachon } from '@components/Logo'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, signupUserProvider } from '@redux/users/users.actions'

import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { signInWithFacebook, signInWithGoogle } from '../../firebase'
import {
  USER_SIGNUP_FACEBOOK_FAILURE,
  USER_SIGNUP_FACEBOOK_REQUEST,
  USER_SIGNUP_FACEBOOK_SUCCESS,
  USER_SIGNUP_GOOGLE_FAILURE,
  USER_SIGNUP_GOOGLE_REQUEST,
  USER_SIGNUP_GOOGLE_SUCCESS,
} from '@redux/users/users.types'

const login = () => {
  const router = useRouter()
  const email = useRef('')
  const password = useRef('')
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    if (users) {
      if (users.credentials?.role === 'admin') {
        router.push('/admin')
      }
      if (
        users.credentials?.role === 'client' ||
        users.credentials?.role === 'mariachi'
      ) {
        router.push('/')
      }
    }
  }, [users])

  const handleSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email: email.current.value,
      password: password.current.value,
    }
    dispatch(loginUser(userData))
  }

  const handleGoogleSignup = async (role) => {
    dispatch({
      type: USER_SIGNUP_GOOGLE_REQUEST,
    })

    signInWithGoogle()
      .then((userGoogle) => {
        const googleUser = userGoogle
        googleUser.user.role = role
        dispatch({
          type: USER_SIGNUP_GOOGLE_SUCCESS,
          payload: googleUser,
        })

        dispatch(signupUserProvider(googleUser))
      })
      .catch((error) => {
        dispatch({
          type: USER_SIGNUP_GOOGLE_FAILURE,
          payload: error,
        })
      })
  }

  const hangleFacebookSignup = (role) => {
    dispatch({
      type: USER_SIGNUP_FACEBOOK_REQUEST,
    })

    signInWithFacebook()
      .then((userFacebook) => {
        const facebookUser = userFacebook
        facebookUser.user.role = role
        dispatch({
          type: USER_SIGNUP_FACEBOOK_SUCCESS,
          payload: facebookUser,
        })
        dispatch(signupUserProvider(facebookUser))
      })
      .catch((error) => {
        dispatch({
          type: USER_SIGNUP_FACEBOOK_FAILURE,
          payload: error,
        })
      })
  }

  return (
    <div className="admin-login-container">
      <div className="login-admin">
        <div className="login-logo">
          <Link href="/">
            <LogoMariachon
              width={180}
              height={60}
              color1="#000"
              color2="#000"
            />
          </Link>
        </div>
        <div>
          <form type="submit">
            <div className="form-login">
              <div>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Correo eletrónico"
                  ref={email}
                />
              </div>
              <div>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Contraseña"
                  ref={password}
                />
              </div>
              <div>
                <button className="form-button" onClick={handleSubmit}>
                  Entrar
                </button>
              </div>
            </div>
          </form>
        </div>
        <div>
          <div className="register-or">
            <div className="hr" />
            <div>
              <p>o</p>
            </div>
            <div className="hr" />
          </div>
        </div>
        {/* <div className={"login-socieux"}>
                    <p>Iniciar sesión con:</p>
                </div> */}
        <div className="login-logos-reseaux">
          <div>
            <p>Iniciar sesión con:</p>
          </div>
          <div className="login-logos">
            <div>
              <FontAwesomeIcon
                icon={faFacebook}
                style={{ fontSize: '4vh' }}
                onClick={() => hangleFacebookSignup('admin')}
              />
            </div>

            <div>
              <FontAwesomeIcon
                icon={faGoogle}
                style={{
                  fontSize: '4vh',
                  marginLeft: '3vh',
                  cursor: 'pointer',
                }}
                onClick={() => handleGoogleSignup('admin')}
              />
            </div>
          </div>
        </div>
        <div>
          <p>¿Olvidaste tu contraseña?</p>
        </div>
      </div>
      <style jsx>
        {`
          .admin-login-container {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(250, 250, 250);
          }
          .login-logo {
            margin-bottom: 5vh;
          }
          .login-admin {
            background: rgba(255, 255, 255);
            padding: 5vh;
            text-align: center;
            margin: 0px 50px 0px 50px;
            border: rgba(0, 0, 0, 0.3) 1px solid;
            display: flex;
            flex-direction: column;
          }
          .form-login {
            display: flex;
            flex-direction: column;
          }
          .form-input {
            margin-top: 1vh;
            padding: 2vh;
            width: 35vh;
            border: rgba(0, 0, 0, 0.1) 1px solid;
            border-radius: 5px;
          }
          .form-button {
            background: rgba(198, 222, 250);
            margin-top: 5vh;
            padding: 1.5vh;
            border: rgba(0, 0, 0, 0.1) 1px solid;
            width: 35vh;
            border-radius: 5px;
          }
          .form-button:hover {
            cursor: pointer;
            background: rgba(0, 0, 255);
            color: #fff;
          }
          .register-or {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          .hr {
            height: 1px;
            width: 15vh;
            background-color: rgba(0, 0, 0, 0.2);
          }
          .login-socieux {
            margin-top: -20px;
          }
          .login-logos-reseaux {
            display: flex;
            flex-direction: row;
          }
          .login-logos-reseaux {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
          }
          .login-logos {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        `}
      </style>
    </div>
  )
}

export default login
