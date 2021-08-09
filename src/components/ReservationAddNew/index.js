import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import PersonIcon from "@material-ui/icons/Person"
// import PeopleIcon from "@material-ui/icons/People"
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'

import ReservationCardM from '@components/ReservationCardM'

import SelectMariachi from '@components/FormSections/SelectMariachi'
import ReservationData from '@components/FormSections/ReservationData'
import PaymentData from '@components/FormSections/PaymentData'

// material ui

import { makeStyles } from '@material-ui/core/styles'

// import Divider from "@material-ui/core/Divider"

import CloudUploadIcon from '@material-ui/icons/CloudUpload'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'

import { Button, Typography } from '@material-ui/core'

import { useRouter } from 'next/router'
import LoadingBox from '@components/LoadingBox'
import {
  createReservationNewClientAndOldClient,
  createReservationNewClientWithoutEmail,
} from '@redux/reservations/reservations.actions'
import ClientData from '@components/FormSections/ClientData'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 150,
  },
  demo: {
    backgroundColor: 'rgba(193, 198, 215, 0.3)',
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  dividerSpace: {
    marginBottom: '1vh',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

let disableBtn = true

function getSteps() {
  return [
    'Selecciona un Mariachi',
    'Datos del cliente',
    'Datos reservación',
    'Forma de pago',
  ]
}

function getStepContent(step, params) {
  switch (step) {
    case 0:
      disableBtn = true
      return SelectMariachi(params)

    case 1:
      disableBtn = true
      return ClientData(params)

    case 2:
      disableBtn = true
      return ReservationData(params)

    case 3:
      disableBtn = false
      return PaymentData(params)

    default:
      return 'Unknown step'
  }
}

const ReservationAddNew = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const allMariachis = useSelector((state) => state.allMariachis)
  const { loadingNewReservation, loadingNeWClient } = useSelector(
    (state) => state.createNewReservation
  )
  // const allUsers = useSelector((state) => state.allUsers)

  const [mariachiData, setMariachiData] = useState({
    image_logo:
      'https://firebasestorage.googleapis.com/v0/b/mariachonauth-prod.appspot.com/o/mariachi_no_image.jpeg?alt=media',
  })

  const [mariachiId, setMariachiId] = useState('')

  const [clientData, setClientData] = useState({})
  const [newClient, setNewClient] = useState(true)

  const [clientExistent, setClientExistent] = useState({})

  const [reservation, setReservation] = useState({
    qty: 1,
    deposit: 0,
    address: '',
    location: 'No asignado',
  })
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [song, setSong] = useState('')
  const [playlist, setPlaylist] = useState([])

  const [price, setPrice] = useState(0)
  const { payment, status } = useSelector(
    (state) => state.parameterForReservations
  )
  const paymentPos = payment
    ? Object.getOwnPropertyNames(payment)
    : Object.getOwnPropertyNames([])

  // const statusNames = Object.getOwnPropertyNames(status ? status : [])

  const mariachiService = mariachiData?.service_price
    ? Object.getOwnPropertyNames(mariachiData?.service_price)
    : null

  // if (mariachiService !== null) {
  //   reservation.service = mariachiService[0]
  // }

  const [cont, setCont] = useState(0)

  const hanldleChangeMariachiId = (e) => {
    e.preventDefault()
    setMariachiId(e.target.value)
  }

  useEffect(async () => {
    if (cont > 0) {
      const dataMariachi = allMariachis.find(
        (maria) => maria.mariachiId === mariachiId
      )

      setMariachiData(dataMariachi)

      // const serviceMari = Object.getOwnPropertyNames(
      //   dataMariachi?.service_price
      // )

      // const e = { target: {} }
      // e.target.name = "service"
      // e.target.value = serviceMari[0]
      // hanldleChangeReservationSoft(e, serviceMari)

      reservation.payment = payment.cash
    }
  }, [mariachiId])

  useEffect(() => {
    if (cont !== 0) {
      if (!loadingNeWClient) {
        disableBtn = false
        if (!loadingNewReservation) {
          router.push('/admin')
          setCont(0)
        }
      }
    }
    setCont(cont + 1)
  }, [loadingNewReservation])

  const hanldleChangeClient = (e) => {
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value,
    })
  }

  const HandleAddSong = (e) => {
    e.preventDefault()
    setPlaylist([...playlist, song])
    setSong('')
  }

  const handleDeleteSong = (e, chanson) => {
    e.preventDefault()
    setPlaylist(playlist.filter((song) => song !== chanson))
  }

  const hanldleChangeReservation = (e) => {
    e.preventDefault()

    setReservation({
      ...reservation,
      [e.target.name]: e.target.value,
    })

    if (e.target.name === 'service') {
      setPrice(mariachiData?.service_price[e.target.value])
    }
  }

  // const hanldleChangeReservationSoft = (e, serviceMari) => {
  //   setReservation({
  //     ...reservation,
  //     [e.target.name]: e.target.value,
  //   })

  //   if (e.target.name === "service") {
  //     setPrice(serviceMari?.service_price[e.target.value])
  //   }
  // }

  const handleAddNewReservation = (e) => {
    e.preventDefault()

    let userDetails = {}
    if (newClient) {
      userDetails = {
        ...clientData,
        password: '123456',
        confirmPassword: '123456',
        role: 'client',
        admin: true,
      }
    } else {
      userDetails = clientExistent
    }

    const reservationDetails = {
      address: reservation.address,
      date: selectedDate,
      location: reservation.location,
      service: reservation.service,
      qty: reservation.qty,
      price,
      deposit: reservation.deposit,
      payment: reservation.payment,
      message: reservation.message ? reservation.message : 'Ningún comentario',
      playlist,
      clientId: ' ',
      mariachiId,
      coordinatorId: mariachiData.coordinatorId,
      status: status.pendant,
    }

    if (sinEmail) {
      dispatch(
        createReservationNewClientAndOldClient(
          reservationDetails,
          mariachiData,
          userDetails,
          newClient
        )
      )
    } else {
      userDetails = {
        ...userDetails,
        role: 'clientNotEmail',
      }
      dispatch(
        createReservationNewClientWithoutEmail(
          reservationDetails,
          mariachiData,
          userDetails
        )
      )
    }

    // dispatch(getAllResevationsFromServer(role, userId))
  }

  /**
   *
   *
   */

  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState(new Set())
  const [skipped, setSkipped] = useState(new Set())
  const steps = getSteps()

  const totalSteps = () => {
    return getSteps().length
  }

  const isStepOptional = (step) => {
    return step === 1
  }

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.")
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1)
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values())
  //     newSkipped.add(activeStep)
  //     return newSkipped
  //   })
  // }

  const skippedSteps = () => {
    return skipped.size
  }

  const completedSteps = () => {
    return completed.size
  }

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps() - skippedSteps()
  }

  const isLastStep = () => {
    return activeStep === totalSteps() - 1
  }

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed
          // find the first step that has been completed
          steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1

    setActiveStep(newActiveStep)
    // Disabled button save
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStep = (step) => () => {
    setActiveStep(step)
  }

  // const handleComplete = () => {
  //   const newCompleted = new Set(completed)
  //   newCompleted.add(activeStep)
  //   setCompleted(newCompleted)

  //   /**
  //    * Sigh... it would be much nicer to replace the following if conditional with
  //    * `if (!this.allStepsComplete())` however state is not set when we do this,
  //    * thus we have to resort to not being very DRY.
  //    */
  //   if (completed.size !== totalSteps() - skippedSteps()) {
  //     handleNext()
  //   }
  // }

  const handleReset = () => {
    setActiveStep(0)
    setCompleted(new Set())
    setSkipped(new Set())
  }

  const isStepSkipped = (step) => {
    return skipped.has(step)
  }

  function isStepComplete(step) {
    return completed.has(step)
  }

  // const [handleClient, setHandleClient] = useState(false)

  // const [mariachiSelected, setMariachiSelected] = useState({
  //   image_logo:
  //     "https://firebasestorage.googleapis.com/v0/b/mariachonauth-prod.appspot.com/o/mariachi_no_image.jpeg?alt=media",
  // })

  // const [clientSelected, setClientSelected] = useState({
  //   fullName: "no asignado",
  //   email: "client@web.com",
  //   phone: "xxx xxx xxxx",
  // })

  // const allClients = allUsers.filter((user) => user.role === "client")

  // useEffect(() => {
  //   console.log(allClients)
  // }, [])

  // const handleSelectClient = (e) => {
  //   e.preventDefault()
  //   const user = allUsers.find((client) => client.userId === e.target.value)

  //   setClientSelected(user)
  // }

  // const handleAddClient = (e) => {
  //   e.preventDefault()
  //   setHandleClient(!handleClient)
  // }

  // const handleNewClient = (e) => {
  //   e.preventDefault()
  //   setClientSelected({
  //     ...clientSelected,
  //     [e.target.name]: e.target.value,
  //   })
  // }

  // const handleSelectMariachi = (e) => {
  //   e.preventDefault()
  //   const mariachi = allMariachis.find(
  //     (mar) => mar.mariachiId === e.target.value
  //   )
  //   setMariachiSelected(mariachi)
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  // }

  const [expanded, setExpanded] = useState('panel1')

  const [byName, setByName] = useState('')

  const [sinEmail, setSinEmail] = useState(true)

  useEffect(() => {
    if (!sinEmail) {
      const e = {
        target: { name: 'email', value: 'mariachireservas@gmail.com' },
      }
      hanldleChangeClient(e)
    } else {
      const e = {
        target: { name: 'email', value: '' },
      }
      hanldleChangeClient(e)
    }
  }, [sinEmail])

  const [searchACMC] = useState(2)
  const keyWords = {
    todos: 'Id',
    mariachi: 'mariachi',
    cliente: 'cliente',
    coordinator: 'Coordinador',
  }

  const paramsForm = {
    editClient: false,
    setClientExistent,
    byName,
    setByName,
    searchACMC,
    keyWords,
    expanded,
    setExpanded,
    classes,
    reservation,
    clientData,
    allMariachis,
    mariachiId,
    hanldleChangeMariachiId,
    hanldleChangeClient,
    hanldleChangeReservation,
    selectedDate,
    setSelectedDate,
    setSong,
    song,
    playlist,
    HandleAddSong,
    handleDeleteSong,
    paymentPos,
    payment,
    price,
    setPrice,
    mariachiService,
    setSinEmail,
    sinEmail,
  }

  useEffect(() => {
    if (!newClient) {
      setClientData(clientExistent)
    } else {
      setClientData({
        fullName: '',
        email: '',
        phone: '',
      })
    }
  }, [clientExistent, newClient])

  useEffect(() => {
    if (expanded === 'panel1') {
      setNewClient(true)
      setClientData({})
    } else {
      setNewClient(false)
    }
  }, [expanded])

  return (
    <div className="container-new-reservation">
      <div className="reservation-edit">
        <div className="card__header">
          <h2>Nueva reservación</h2>
        </div>
        <div className={classes.root}>
          <Stepper
            className={classes.demo}
            alternativeLabel
            nonLinear
            activeStep={activeStep}
          >
            {steps.map((label, index) => {
              const stepProps = {}
              const buttonProps = {}
              if (isStepOptional(index)) {
                buttonProps.optional = (
                  <Typography variant="caption"></Typography>
                )
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepButton
                    onClick={handleStep(index)}
                    completed={isStepComplete(index)}
                    {...buttonProps}
                  >
                    {label}
                  </StepButton>
                </Step>
              )
            })}
          </Stepper>
          <div>
            {allStepsCompleted() ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed - youre finished
                </Typography>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep, paramsForm)}
                </Typography>
                <div>
                  <NavigateBeforeIcon
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    style={{
                      color: '#000',
                      cursor: 'pointer',
                    }}
                  />
                  {'        '}

                  <NavigateNextIcon
                    disabled={activeStep === 0}
                    onClick={handleNext}
                    style={{
                      color: '#000',
                      cursor: 'pointer',
                    }}
                  />

                  {/* {isStepOptional(activeStep) &&
                        !completed.has(activeStep) && (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSkip}
                            className={classes.button}
                          >
                            Skip
                          </Button>
                        )} */}
                  {/* 
                      {activeStep !== steps.length &&
                        (completed.has(activeStep) ? (
                          <Typography
                            variant="caption"
                            className={classes.completed}
                          >
                            Paso {activeStep + 1} already completed
                          </Typography>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleComplete}
                          >
                            {completedSteps() === totalSteps() - 1
                              ? "Finish"
                              : "Complete Step"}
                          </Button>
                        ))} */}
                </div>
              </div>
            )}
          </div>
        </div>
        <form className={classes.root} noValidate autoComplete="off">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
            onClick={handleAddNewReservation}
            disabled={disableBtn}
          >
            Guardar
          </Button>
          <div>
            {(loadingNeWClient || loadingNewReservation) && <LoadingBox />}
            {loadingNeWClient ? (
              <strong>Cargando cliente</strong>
            ) : loadingNewReservation ? (
              <strong>Cargando Resevación</strong>
            ) : null}
          </div>
        </form>
      </div>

      <div className="reservation-card">
        <ReservationCardM
          mariachiData={mariachiData}
          reservation={reservation}
          dateTime={selectedDate}
          clientData={clientData}
          price={price}
          playlist={playlist}
          editClient={false}
        />
      </div>

      <style jsx>{`
        .container-new-reservation {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-around;
          align-items: start;
        }
        .reservation-edit {
          width: 450px;
          height: auto;
          padding: 2rem;
          margin-bottom: 2vh;
          border-radius: 1rem;
          /* other styles */
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
          -webkit-backdrop-filter: blur(10px);
        }
        .reservation-card {
          width: 450px;
          height: auto;
          margin-bottom: 2vh;
        }
        .card__header {
          height: 8vh;
          background: rgba(100, 100, 100, 0.1);
          border-radius: 1rem;
          text-align: center;
          margin-bottom: 1.5vh;
        }

        .card__header > h2 {
          padding-top: 15px;
        }
      `}</style>
    </div>
  )
}

export default ReservationAddNew
