import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { editUserDetails } from '@redux/users/users.actions'

const DetailsAdmin = () => {
  const router = useRouter()

  // const [imageUrl, setImageUrl] = useState("")
  // const [role, setRole] = useState("")
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [fullName, setFullName] = useState('')
  const [userName, setUserName] = useState('')
  const [userId, setUserId] = useState('')

  const users = useSelector((state) => state.users)

  const { credentials } = users

  const dispatch = useDispatch()

  useEffect(() => {
    setEmail(credentials.email)
    setUserName(credentials.userName)
    setFullName(credentials.fullName)
    //  setRole(credentials.role)
    setPhone(credentials.phone)
    //  setImageUrl(credentials.imageUrl)
    setUserId(credentials.userId)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const userDetails = {
      state: 'Puebla',
      email,
      userName,
      fullName,
      phone,
    }
    console.log(userDetails)

    dispatch(editUserDetails(userDetails, userId))
    router.push('/admin')
  }

  return (
    <div className="admin-user-container">
      <div className="user-admin">
        <div>
          <h3>
            Actualizar datos de
            {fullName}
          </h3>
        </div>
        <div>
          <form type="submit">
            <div className="form-user">
              <div>
                <label>Nombre de usuario: </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nombdre de usuario"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div>
                <label>Nombre completo: </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nombre completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <label>Correo electrónico: </label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Correo eletrónico"
                  value={email}
                  readOnly
                />
              </div>

              <div>
                <label>Telefono: </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Telefono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <button
                  disabled={credentials.loadingUser}
                  className="form-button"
                  onClick={handleSubmit}
                >
                  Actualizar
                </button>
              </div>
            </div>
          </form>
        </div>
        <div />
      </div>
      <style jsx>
        {`
          .admin-user-container {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: start;
            background: rgba(235, 235, 235);
          }

          .user-admin {
            background: rgba(238, 238, 238);
            padding: 5vh;
            text-align: center;
            margin: 0px 50px 0px 50px;
            border: rgba(0, 0, 0, 0) 1px solid;
            display: flex;
            flex-direction: column;
          }
          .form-user {
            display: flex;
            flex-direction: column;
          }
          .form-input {
            background: rgba(238, 238, 238);
            margin-top: 2vh;
            padding: 1vh;
            width: 35vh;
            border: none;
            border-bottom: 1px solid rgba(0, 0, 0, 0.5);
          }

          .form-input[type='text']:focus {
            outline: none;
            background-color: rgba(220, 220, 220);
          }
          .form-input[type='email']:focus {
            outline: none;
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

export default DetailsAdmin
