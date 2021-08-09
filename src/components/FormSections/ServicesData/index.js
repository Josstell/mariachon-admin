import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'
import { InputAdornment } from '@material-ui/core'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    marginBottom: 30,
  },
  margin: {
    margin: 10,
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

export default function ServicesData({ serviceD }) {
  const classes = useStyles()
  const theme = useTheme()
  const { values, setValues } = serviceD
  const [personName, setPersonName] = React.useState([])

  const { services } = useSelector((state) => state.parameterForReservations)

  // const [values, setValues] = React.useState({})

  const handleChangePrice = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleChange = (event) => {
    setPersonName(event.target.value)
  }

  let servicios = []

  if (services) {
    servicios = Object.getOwnPropertyNames(services)
  } else {
    return null
  }

  return (
    <div className="collapse-content">
      <div className="inner-content">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-chip-label">Servicio</InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={personName}
            onChange={handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {servicios.map((name, index) => (
              <MenuItem
                key={name}
                value={Object.values(services)[index]}
                style={getStyles(name, personName, theme)}
              >
                {Object.values(services)[index]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div>
          {personName.find((service) => service === 'Serenata') && (
            <FormControl fullWidth className={classes.margin}>
              <InputLabel htmlFor="standard-adornment-amount">
                Serenata
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                value={values.serenata}
                onChange={handleChangePrice('serenata')}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
          )}
        </div>
        {personName.find((service) => service === 'Hora') && (
          <FormControl fullWidth className={classes.margin}>
            <InputLabel htmlFor="standard-adornment-amount">Hora</InputLabel>
            <Input
              id="standard-adornment-amount"
              value={values.hora}
              onChange={handleChangePrice('hora')}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        )}

        {personName.find((service) => service === 'Contrato') && (
          <FormControl fullWidth className={classes.margin}>
            <InputLabel htmlFor="standard-adornment-amount">
              Contrato
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              value={values.contrato}
              onChange={handleChangePrice('contrato')}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        )}
      </div>
    </div>
  )
}
