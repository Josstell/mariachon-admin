import { useSelector } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'

import PersonAddIcon from '@material-ui/icons/PersonAdd'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
    minWidth: 120,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
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

const CoordinatorData = ({ coordinator, updateMariachi }) => {
  const classes = useStyles()
  const theme = useTheme()

  const { instruments } = useSelector((state) => state.parameterForReservations)

  const instrumentos = Object.getOwnPropertyNames(instruments)

  // const handleClose = async (e) => {
  //   e.preventDefault()
  //   const newUserData = {
  //     email: email.current.value,
  //     password: "123456",
  //     confirmPassword: "123456",
  //     userName: userName.current?.value ? userName.current.value : "",
  //     fullName: fullName.current?.value,
  //     phone: phone.current.value,
  //     instrument: instruName || "Violin ",
  //     admin: true,
  //     role: "client",
  //   }

  //   // dispatch(setAddNewUser(newUserData))
  // }

  // const hanldleChangeRole = (e) => {
  //   e.preventDefault()
  //   console.log(e.target.value)

  //   setRole(e.target.value)
  // }

  const {
    email,
    setEmail,
    fullName,
    setFullName,
    userName,
    setUserName,
    phone,
    setPhone,
    instruName,
    setInstruName,
  } = coordinator

  return (
    <div className="collapse-content">
      <div className="collapse" id="element-one">
        <a className="element-one" href="#element-one">
          <i className="fab fa-instagram"></i> Coordinador
        </a>
        <div className="content">
          <div className="inner-content">
            {/** */}
            <div className={classes.root}>
              <TextField
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                id="standard-full-width"
                label="Nombre completo"
                style={{ margin: 8 }}
                placeholder="Coordinador"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                id="standard-full-width"
                label="Nombre de usuario"
                style={{ margin: 8 }}
                placeholder="nombre de usuario"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                id="standard-full-width"
                label="Telefono"
                style={{ margin: 8 }}
                placeholder="Numero de celular"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {!updateMariachi && (
                <TextField
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  id="standard-full-width"
                  label="Correo eletrónico"
                  style={{ margin: 8 }}
                  placeholder="email"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
              <FormControl className={classes.formControl}>
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
                  {instrumentos.map((name, index) => (
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
            </div>

            {/** */}
          </div>
        </div>
      </div>
      <div className="collapse" id="element-two">
        <a className="element-two" href="#element-two">
          <i className="fab fa-twitter"></i> Elementos
        </a>
        <div className="content">
          <div className="inner-content">
            {/** */}
            <div className={classes.root}>
              <TextField
                id="standard-full-width"
                label="Nombre completo"
                style={{ margin: 8 }}
                placeholder="Elemento"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="standard-full-width"
                label="Telefono"
                style={{ margin: 8 }}
                placeholder="Numero de celular"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="standard-full-width"
                label="Correo eletrónico"
                style={{ margin: 8 }}
                placeholder="email"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl className={classes.formControl}>
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
                  {instrumentos.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, instruName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div
                style={{
                  marginTop: 10,
                  position: 'relative',
                  right: '-90%',
                  cursor: 'pointer',
                }}
              >
                <PersonAddIcon />
              </div>
            </div>
            {/** */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoordinatorData
