import React from 'react'
import { LogoMariachon } from '@components/Logo'

const Signin = ({ props }) => {
  const { width, height, color1, color2, email, password, handleSubmit } = props
  return (
    <div className="admin-login-container">
      <div className="login-admin">
        <div className="login-logo">
          <LogoMariachon
            width={width}
            height={height}
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
  )
}

export default Signin
