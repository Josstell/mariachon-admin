import React from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import DateFnsUtils from '@date-io/date-fns' // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import SaveIcon from '@material-ui/icons/Save'
import QueueMusicIcon from '@material-ui/icons/QueueMusic'
import DeleteIcon from '@material-ui/icons/Delete'

import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from '@material-ui/core'

const ReservationData = ({
  classes,
  reservation,
  hanldleChangeReservation,
  selectedDate,
  setSelectedDate,
  song,
  setSong,
  HandleAddSong,
  playlist,
  handleDeleteSong,
}) => {
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <InputLabel>Datos reservación</InputLabel>

      <FormControl className={classes.formControl}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            value={selectedDate}
            onChange={setSelectedDate}
            label="Fecha y hora"
          />
        </MuiPickersUtilsProvider>
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          id="filled-basic"
          variant="filled"
          label="Dirección"
          name="address"
          placeholder="Dirección del evento"
          value={reservation.address}
          onChange={hanldleChangeReservation}
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <TextField
          id="filled-basic"
          variant="filled"
          label="Mensaje"
          name="message"
          placeholder="¿Algún mensage en particular?"
          value={reservation.message}
          onChange={hanldleChangeReservation}
          multiline
        />
      </FormControl>

      <Accordion
        style={{
          backgroundColor: 'rgba(0,0,0,0)',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Lista de canciones...
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <FormControl className={classes.formControl}>
            <TextField
              id="filled-basic"
              variant="filled"
              label="Agregar canciones"
              className="form-input"
              value={song}
              onChange={(e) => setSong(e.target.value)}
            />
            <IconButton
              edge="end"
              aria-label="delete"
              style={{
                position: 'absolute',
                right: '-30px',
                bottom: '-40px',
                color: '#000',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              <SaveIcon onClick={HandleAddSong} />
            </IconButton>
          </FormControl>

          <FormControl className={classes.formControl}>
            <div>
              <List>
                {playlist &&
                  playlist.map((play, index) => (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar>
                          <QueueMusicIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={play} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon
                            onClick={(e) => handleDeleteSong(e, play)}
                          />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
              </List>
            </div>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </form>
  )
}

export default ReservationData
