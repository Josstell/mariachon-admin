import React, { useRef } from 'react'
import { useRouter } from 'next/router'
import { LogoMariachon } from '@components/Logo'
import { useDispatch } from 'react-redux'
import { loginUser } from '@redux/users/users.actions'
import AuthAdmin from '@components/AuthAdmin'

const color1 = '#000'
const color2 = '#000'

const LoginAdmin = () => {
  const router = useRouter()

  const email = useRef('')
  const password = useRef('')

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email: email.current.value,
      password: password.current.value,
    }
    dispatch(loginUser(userData))
    router.push('/admin')
  }

  return (
    <AuthAdmin>
      <div className="admin-login-container">
        <div className="login-admin">
          <div className="login-logo">
            <LogoMariachon
              width={180}
              height={60}
              color1={color1}
              color2={color2}
            />
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
                  <button
                    type="button"
                    className="form-button"
                    onClick={handleSubmit}
                  >
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
          `}
        </style>
      </div>
    </AuthAdmin>
  )
}

export default LoginAdmin
