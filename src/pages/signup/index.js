import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LogoMariachon } from '@components/Logo'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser } from '@redux/users/users.actions'

const signup = () => {
  const router = useRouter()

  const {
    query: { role },
  } = router
  const email = useRef('')
  const password = useRef('')
  const confirmPassword = useRef('')
  const userName = useRef('')
  const users = useSelector((state) => state.users)

  const dispatch = useDispatch()

  useEffect(() => {
    if (users) {
      if (users.credentials?.role === 'admin') {
        router.push('/admin')
      }
      if (
        users.credentials?.role === 'client' ||
        users.credentials?.role === 'mariachi' ||
        users.credentials?.role === 'coordinator'
      ) {
        router.push('/')
      }
    }
  }, [users])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newUserData = {
      email: email.current.value,
      password: password.current.value,
      confirmPassword: confirmPassword.current.value,
      role,
    }

    if (role !== 'client') {
      newUserData.userName = userName.current.value
    }

    console.log(newUserData)
    dispatch(signupUser(newUserData))
  }

  return (
    //    <AuthAdmin>

    <div className="admin-login-container">
      <div className="login-admin">
        <div className="login-logo">
          <Link href="/">
            <LogoMariachon
              width={180}
              height={60}
              color1="#222"
              color2="#222"
            />
          </Link>
        </div>
        <div>
          {role === 'client' && (
            <p>
              Registro de
              <span>Cliente</span>
            </p>
          )}
          {role === 'coordinator' && (
            <p>
              Registro de
              <span>Coordinador</span>
            </p>
          )}
          {role === 'mariachi' && (
            <p>
              Registro de
              <span>Mariachi</span>
            </p>
          )}
        </div>
        <div>
          <form type="submit">
            <div className="form-login">
              {role !== 'client' ? (
                <div>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="¿Como te dicen?"
                    ref={userName}
                  />
                </div>
              ) : null}
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
                <input
                  type="password"
                  className="form-input"
                  placeholder="Confirmar contraseña"
                  ref={confirmPassword}
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
        <div className="login-socieux">
          <p>Iniciar sesión con:</p>
        </div>
        <div className="login-logos-reseaux" />
        <div>
          <p>
            ¿Ya estas registrado?, entra
            <span onClick={() => router.push('/login')}>aquí</span>
          </p>
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
            margin-bottom: 2vh;
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
        `}
      </style>
    </div>

    //     </AuthAdmin>
  )
}

export default signup
