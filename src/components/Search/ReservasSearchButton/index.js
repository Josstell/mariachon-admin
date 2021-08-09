import React from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SendIcon from '@material-ui/icons/Send'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'
import {
  MariachiIcon,
  EventsIcon,
  MexicoStatesIcon,
  CoordinatorIcon,
} from '@components/IconsSvg'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: ' rgba(255, 255, 255, 0.2)',
  },
  sizeFontSize: {
    fontSize: '1vh',
    width: '100',
  },
})

export default function ReservasSearchButton({
  handleButtons,
  buttonsEnabled,
}) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (e, newValue) => {
    e.preventDefault()
    setValue(newValue)
    handleButtons(value)
  }

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon label tabs example"
      >
        {buttonsEnabled.todos && (
          <Tab
            icon={<EventsIcon style={{ width: '30px' }} />}
            label="Todos (numero de Id)"
            className={classes.sizeFontSize}
          />
        )}
        {buttonsEnabled.pendiente && (
          <Tab
            icon={<SendIcon />}
            label="Pendientes a enviar"
            className={classes.sizeFontSize}
          />
        )}

        {buttonsEnabled.mariachi && (
          <Tab
            icon={<MariachiIcon style={{ width: '30px' }} />}
            label="Mariachi"
            className={classes.sizeFontSize}
          />
        )}

        {buttonsEnabled.cliente && (
          <Tab
            icon={<SupervisedUserCircleIcon />}
            label="clientes"
            className={classes.sizeFontSize}
          />
        )}

        {buttonsEnabled.members && (
          <Tab
            icon={<SupervisedUserCircleIcon />}
            label="miembros"
            className={classes.sizeFontSize}
          />
        )}
        {buttonsEnabled.coordinator && (
          <Tab
            icon={<CoordinatorIcon style={{ width: '30px' }} />}
            label="coordinador"
            className={classes.sizeFontSize}
          />
        )}
        {buttonsEnabled.state && (
          <Tab
            icon={<MexicoStatesIcon style={{ width: '30px' }} />}
            label="estado"
            className={classes.sizeFontSize}
          />
        )}
      </Tabs>
    </Paper>
  )
}
