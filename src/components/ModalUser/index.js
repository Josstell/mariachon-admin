import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { setAddNewUser } from '@redux/users/users.actions'

const ModalUser = ({ classes, open, setOpen, addMariachi, roleAssign }) => {
  const { userTypes, instruments } = useSelector(
    (state) => state.parameterForReservations
  )
  const userPrivileges = Object.getOwnPropertyNames(userTypes)
  const instrumentos = Object.getOwnPropertyNames(instruments)

  const email = useRef('')
  const fullName = useRef('')
  const userName = useRef('')
  const phone = useRef('')
  const [role, setRole] = useState('client')
  const [instru, setInstru] = useState('')

  useEffect(() => {
    setRole(roleAssign)
  }, [])

  const dispatch = useDispatch()

  const handleClose = async (e) => {
    e.preventDefault()

    const newUserData = {
      email: email.current.value,
      password: '123456',
      confirmPassword: '123456',
      userName: userName.current?.value ? userName.current.value : '',
      fullName: fullName.current?.value,
      phone: phone.current.value,
      instrument: instru || 'Violin ',
      admin: true,
      role,
    }

    dispatch(setAddNewUser(newUserData))

    setOpen(false)
  }

  const hanldleChangeRole = (e) => {
    e.preventDefault()
    console.log(e.target.value)

    setRole(e.target.value)
  }

  const hanldleChangeInstrument = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    setInstru(e.target.value)
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div>
              <h3>Agregar nuevo {role}</h3>
              <form type="submit">
                <div className="form-login">
                  {!addMariachi && (
                    <div>
                      <label htmlFor="role">Tipo de usuario:</label>
                      <select
                        id="role"
                        name="role"
                        value={role}
                        onChange={hanldleChangeRole}
                      >
                        {userPrivileges?.map((type, index) => (
                          <option key={index} value={type}>
                            {userTypes[type]}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {(role === 'coordinator' || role === 'mariachi') && (
                    <div>
                      <label htmlFor="instrument">Instrumento:</label>
                      <select
                        id="instrument"
                        name="instrument"
                        value={instru}
                        onChange={hanldleChangeInstrument}
                      >
                        {instrumentos?.map((type, index) => (
                          <option key={index} value={instruments[type]}>
                            {instruments[type]}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {role !== 'client' && (
                    <div>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Nombre de usuario"
                        ref={userName}
                        required
                      />
                    </div>
                  )}

                  <div>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Nombre completo"
                      ref={fullName}
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="telefono"
                      ref={phone}
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="Correo eletrónico"
                      ref={email}
                      required
                    />
                  </div>

                  <div>
                    <button className="form-button" onClick={handleClose}>
                      Entrar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
      <style jsx>{`
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
      `}</style>
    </div>
  )
}

export default ModalUser
