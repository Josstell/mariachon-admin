import FormControl from '@material-ui/core/FormControl'

import { TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import CardsSelectClient from '@components/CardsSelectClient'
import SearchInput from '../SearchInput'

import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const Accordion = withStyles({
  root: {
    backgroundColor: 'rgba(209, 213, 232, 0.2)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion)

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(209, 213, 232, 0.2)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary)

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    backgroundColor: 'rgba(209, 213, 232, 0.2)',
  },
}))(MuiAccordionDetails)

const ClientData = ({
  classes,
  clientData,
  hanldleChangeClient,
  editClient,
  action,
  expanded,
  setExpanded,
  byName,
  setByName,
  searchACMC,
  keyWords,
  setClientExistent,
  setSinEmail,
  sinEmail,
}) => {
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <div className="container">
      <Accordion
        square
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>
            {editClient ? 'Editar cliente' : 'Agregar cliente nuevo'}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form
            noValidate
            autoComplete="off"
            style={{
              backgroundColor: 'rgba(240, 240, 240, 0.2)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {!editClient && (
              <div>
                <FormControlLabel
                  value={sinEmail}
                  control={<Checkbox color="primary" />}
                  label={sinEmail ? 'Cliente con Email' : 'Cliente sin Email'}
                  labelPlacement="end"
                  onClick={() => setSinEmail(!sinEmail)}
                />
              </div>
            )}
            <div style={{ width: '100%' }}>
              <FormControl className={classes.formControl}>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  label="Nombre del cliente"
                  type="text"
                  name="fullName"
                  value={clientData?.fullName}
                  onChange={hanldleChangeClient}
                />
              </FormControl>
            </div>
            <div style={{ display: 'flex' }}>
              <FormControl className={classes.formControl}>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  label="Teléfono"
                  type="text"
                  name="phone"
                  value={clientData?.phone}
                  onChange={hanldleChangeClient}
                />
              </FormControl>
              {!editClient && (
                <FormControl className={classes.formControl}>
                  <TextField
                    id="filled-basic"
                    variant="filled"
                    label="Correo electrónico "
                    type="text"
                    name="email"
                    value={clientData?.email}
                    onChange={hanldleChangeClient}
                  />
                </FormControl>
              )}
            </div>
          </form>
        </AccordionDetails>
      </Accordion>

      {!editClient && (
        <Accordion
          square
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Agregar {action?.typeUser} existente</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <>
              <FormControl className={classes.formControl}>
                <SearchInput
                  searchACMC={searchACMC}
                  keyWords={keyWords}
                  setByName={setByName}
                />
                <CardsSelectClient
                  searchACMC={searchACMC}
                  byName={byName}
                  setClientExistent={setClientExistent}
                />
                {/* <Select
                  id="mariachi"
                  name="mariachiId"
                  label="Mariachi"
                  value={mariachiId}
                  onChange={hanldleChangeMariachiId}
                >
                  <MenuItem value="">
                    <em> </em>
                  </MenuItem>
                   {allUsers &&
                    allMariachis?.map((mariachi) => (
                      <MenuItem
                        key={mariachi.mariachiId}
                        value={mariachi.mariachiId}
                      >
                        {mariachi.name}
                      </MenuItem>
                    ))} 
                </Select> */}
              </FormControl>
            </>
          </AccordionDetails>
        </Accordion>
      )}

      <style jsx>{`
        .container {
          width: 100%;
        }
      `}</style>
    </div>
  )
}

export default ClientData
