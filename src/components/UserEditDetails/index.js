import {
  editUserDetailsAdmin,
  handleImageChangeAdmin,
} from '@redux/users/users.actions'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EditIcon from '@material-ui/icons/Edit'
import LoadingBox from '@components/LoadingBox'
import { useRouter } from 'next/router'

import TextField from '@material-ui/core/TextField'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core'
import { SwapVerticalCircleOutlined } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    button: {
      width: '100%',
    },
    formControl: {
      width: '100%',
    },
  },
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

const UserEditDetails = () => {
  const router = useRouter()
  const classes = useStyles()
  const theme = useTheme()

  const [mariachi, setmariachi] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [userName, setUserName] = useState('')

  const { loadingImageAdmin, loadingUser } = useSelector((state) => state.users)
  const { instruments } = useSelector((state) => state.parameterForReservations)
  const instrumentos = instruments
    ? Object.getOwnPropertyNames(instruments)
    : Object.getOwnPropertyNames([])

  const userToEdit = useSelector((state) => state.userToEdit)
  const allMariachis = useSelector((state) => state.allMariachis)

  const [instruName, setInstruName] = useState(
    userToEdit?.instrument ? userToEdit.instrument : []
  )

  // const [instru, setInstru] = useState(userToEdit.instrument)
  const [enable, setEnable] = useState(userToEdit?.enable)

  const dispatch = useDispatch()

  useEffect(() => {
    if (userToEdit?.role === 'coordinator' || userToEdit?.role === 'mariachi') {
      const mariachiData = allMariachis.find(
        (mariachi) => mariachi.mariachiId === userToEdit?.mariachiId
      )

      setmariachi(mariachiData)
    }
  }, [userToEdit])

  useEffect(() => {
    setFullName(userToEdit?.fullName)
    setPhone(userToEdit?.phone)
    setUserName(userToEdit?.userName)
  }, [userToEdit])

  // const hanldleChangeInstrument = (e) => {
  //   e.preventDefault()
  //   setInstru(e.target.value)
  // }

  const handleImagePicture = () => {
    const fileInput = document.getElementById('imageInputAdmin')
    fileInput.click()
  }

  const handleUpdate = (e) => {
    e.preventDefault()

    const userDetails = {
      fullName,
      userName,
      phone,
      enable,
      role: userToEdit.role,
      instrument: instruName,
    }

    dispatch(editUserDetailsAdmin(userDetails, userToEdit.userId))

    router.push('/admin')
  }

  return (
    <div className="user-edit-container">
      <div className="card">
        <h2>Actualizar Datos</h2>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-full-width"
            label="Nombre completo"
            style={{ margin: 8 }}
            placeholder="Nombre Complete"
            fullWidth
            margin="normal"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            id="standard-full-width"
            label="Sobre nombre"
            style={{ margin: 8 }}
            placeholder="Nombnre de usuario"
            fullWidth
            margin="normal"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            id="standard-full-width"
            label="Telefono"
            style={{ margin: 8 }}
            placeholder="Número de celular"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <div>
            {(userToEdit?.role === 'mariachi' ||
              userToEdit?.role === 'coordinator') && (
              <FormControl
                className={classes.root}
                style={{ width: '80%', marginTop: 20, marginBottom: 20 }}
              >
                <InputLabel id="demo-mutiple-chip-label">
                  Instrumento(s)
                </InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  value={instruName}
                  onChange={(e) => setInstruName(e.target.value)}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {instrumentos?.map((name, index) => (
                    <MenuItem
                      key={index}
                      value={Object.values(instruments)[index]}
                      style={getStyles(name, instruName, theme)}
                    >
                      {Object.values(instruments)[index]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </div>

          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={enable}
                  onChange={(e) => setEnable(e.target.checked)}
                  name="checkedB"
                  color="primary"
                />
              }
              label={enable ? 'Deshabilitar' : 'Habilitar'}
            />
          </div>

          <div className="button-space">
            <Button
              variant="contained"
              color="primary"
              className={classes.root}
              startIcon={<SwapVerticalCircleOutlined />}
              onClick={handleUpdate}
              style={{ width: '80%' }}
            >
              Actualizar
            </Button>
          </div>

          <div>{loadingUser && <LoadingBox />}</div>
        </form>
      </div>

      <div className="card">
        <div>
          <img src={userToEdit?.imageUrl} alt={fullName} />
          <input
            type="file"
            id="imageInputAdmin"
            hidden="hidden"
            onChange={(e) =>
              dispatch(handleImageChangeAdmin(e, userToEdit?.userId))
            }
          />
          <span>
            <EditIcon
              onClick={handleImagePicture}
              style={{ color: '#000', fontSize: '12px' }}
            />{' '}
          </span>

          <div>{loadingImageAdmin && <LoadingBox />}</div>
          <p>{userToEdit?.role}</p>
        </div>
        <h3 className="card-title">{fullName}</h3>
        <p>{userName}</p>

        <hr className="horizontal-line" />

        {(userToEdit?.role === 'mariachi' ||
          userToEdit?.role === 'coordinator') && <p>{mariachi?.name}</p>}

        <p>
          <strong>Email:</strong>
          {userToEdit?.email}
        </p>
        <p>
          <strong>Telefono:</strong>
          {phone}
        </p>
        {(userToEdit?.role === 'mariachi' ||
          userToEdit?.role === 'coordinator') && (
          <p>
            <strong>Instrumento: </strong>
            {instruName.map((ins, index) => (
              <strong key={ins}>
                {ins}
                {index < instruName.length - 1 ? ',' : null}
              </strong>
            ))}
          </p>
        )}
        <p>
          <strong>Estado: </strong>
          {enable ? 'activo' : 'no activo'}
        </p>
      </div>

      <style jsx>
        {`
          .button-space {
            margin-top: 20px;
          }
          .user-edit-container {
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
          img {
            width: 200px;
            height: 200px;
            border-radius: 75px;
          }

          .card {
            width: 400px;
            height: auto;
            padding: 2rem;
            border-radius: 1rem;
            /* other styles */
            background: rgba(255, 255, 255, 0.2);
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
          }

          .card-title {
            margin-top: 0;
            margin-bottom: 0.5rem;
            font-size: 1.2rem;
          }

          p,
          a {
            font-size: 1rem;
          }

          a {
            color: #4d4ae8;
            text-decoration: none;
          }
          p {
            margin: 5px 0 0 0;
          }
        `}
      </style>
    </div>
  )
}

export default UserEditDetails
