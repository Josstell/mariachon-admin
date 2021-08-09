import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from '@components/LoadingBox'
import ReservationCardM from '@components/ReservationCardM'
import { updateReservationById } from '@redux/reservations/reservations.actions'

import SelectMariachi from '@components/FormSections/SelectMariachi'
import ReservationData from '@components/FormSections/ReservationData'
import PaymentData from '@components/FormSections/PaymentData'

// material ui

import { makeStyles } from '@material-ui/core/styles'

import Divider from '@material-ui/core/Divider'

import CloudUploadIcon from '@material-ui/icons/CloudUpload'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'

import { Button, Typography } from '@material-ui/core'
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
      return SelectMariachi(params)

    case 1:
      return ClientData(params)
    case 2:
      return ReservationData(params)
    case 3:
      return PaymentData(params)

    default:
      return 'Unknown step'
  }
}

const ReservationEditDetails = () => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const [completed, setCompleted] = React.useState(new Set())
  const [skipped, setSkipped] = React.useState(new Set())
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

  const router = useRouter()
  const dispatch = useDispatch()
  const { reservationById, loadingResetationById } = useSelector(
    (state) => state.reservationGetByIdAPIToEdit
  )
  const allMariachis = useSelector((state) => state.allMariachis)
  const {
    credentials: { role, userId },
  } = useSelector((state) => state.users)
  const { loadingAllResFromServer } = useSelector(
    (state) => state.allReservationsAdminAPI
  )
  const { loadingUpdatedById } = useSelector(
    (state) => state.reservationUpdatedByIdAPITo
  )
  const { payment } = useSelector((state) => state.parameterForReservations)

  const paymentPos = payment
    ? Object.getOwnPropertyNames(payment)
    : Object.getOwnPropertyNames([])

  // const { reservationId, mariachiData: { image_logo, nameMariachi, coordinator }, service, price, date, address, client: { nameClient, phone, email }
  // } = reservationToEdit

  const [reservation, setReservation] = useState({})
  const [mariachiId, setMariachiId] = useState('')
  const [mariachiData, setMariachiData] = useState({})
  const [clientData, setClientData] = useState({})

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [song, setSong] = useState('')

  const [playlist, setPlaylist] = useState([])
  const [price, setPrice] = useState(0)

  const [cont, setCont] = useState(0)

  const mariachiService = mariachiData?.service_price
    ? Object.getOwnPropertyNames(mariachiData?.service_price)
    : null

  const hanldleChangeMariachiId = (e) => {
    e.preventDefault()

    setMariachiId(e.target.value)
  }

  useEffect(async () => {
    if (cont > 0) {
      setMariachiData(
        allMariachis.find((maria) => maria.mariachiId === mariachiId)
      )
    }
  }, [mariachiId])

  useEffect(() => {
    if (cont !== 0) {
      if (!loadingUpdatedById) {
        if (!loadingAllResFromServer) {
          router.push('/admin')
          setCont(0)
        }
      }
    }
    setCont(cont + 1)
  }, [loadingUpdatedById])

  useEffect(() => {
    if (
      reservationById !== {} &&
      reservationById.reservationDetails !== undefined
    ) {
      setReservation({
        reservationId: reservationById.reservationDetails.reservationId,
        service: reservationById.reservationDetails.service,
        qty: reservationById.reservationDetails.qty,
        date: reservationById.reservationDetails.date,
        address: reservationById.reservationDetails.address,
        message: reservationById.reservationDetails.message,
        deposit: reservationById.reservationDetails.deposit,
        payment: reservationById.reservationDetails.payment,
        status: reservationById.reservationDetails.status,
      })
      setMariachiId(reservationById.reservationDetails.mariachiId)
      setClientData(reservationById.reservationDetails.clientDetails)
      setPlaylist(reservationById.reservationDetails.playlist)
      setPrice(reservationById.reservationDetails.price)
      setSelectedDate(reservationById.reservationDetails.date)
      setMariachiData(reservationById.reservationDetails.mariachiDetails)
    }
  }, [reservationById])

  const HandleAddSong = (e) => {
    e.preventDefault()
    setPlaylist([...playlist, song])
    setSong('')
  }

  const handleDeleteSong = (e, chanson) => {
    e.preventDefault()
    setPlaylist(playlist.filter((song) => song !== chanson))
  }

  const handleUpdateReservation = (e) => {
    e.preventDefault()

    const reservationDetails = {
      address: reservation.address,
      date: selectedDate,
      location: '',
      service: reservation.service,
      qty: parseFloat(reservation.qty),
      price,
      deposit: reservation.deposit,
      payment: reservation.payment,
      message: reservation.message,
      playlist,
      status: reservation.status,
      mariachiId,
    }

    dispatch(
      updateReservationById(
        reservation.reservationId,
        reservationDetails,
        clientData,
        role,
        userId
      )
    )

    // dispatch(getAllResevationsFromServer(role, userId))
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

  const hanldleChangeClient = (e) => {
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value,
    })
  }

  const [expanded, setExpanded] = useState('panel1')

  const [byName, setByName] = useState('')

  const [searchACMC] = useState(2)
  const keyWords = {
    todos: 'Id',
    mariachi: 'mariachi',
    cliente: 'cliente',
    coordinator: 'Coordinador',
  }

  const paramsForm = {
    editClient: true,
    byName,
    setByName,
    searchACMC,
    keyWords,
    expanded,
    setExpanded,
    classes,
    mariachiId,
    allMariachis,
    hanldleChangeMariachiId,
    clientData,
    hanldleChangeClient,
    reservation,
    hanldleChangeReservation,
    mariachiService,
    selectedDate,
    setSelectedDate,
    song,
    setSong,
    HandleAddSong,
    playlist,
    handleDeleteSong,
    paymentPos,
    payment,
    price,
    setPrice,
    mariachiData,
  }
  return (
    <>
      {loadingResetationById ? (
        <LoadingBox />
      ) : (
        <div className="reservation-edit-container">
          <div className="reservation-edit">
            <div className="card__header">
              <h2>Cambiar reservación</h2>
            </div>
            {/** **************** */}

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
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Regresar
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        Siguiente
                      </Button>

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

            {/** **************** */}

            <Divider className={classes.dividerSpace} />

            {/* Datos del cliente */}

            {/* Datos de reservacion */}

            <form className={classes.root} noValidate autoComplete="off">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
                onClick={handleUpdateReservation}
              >
                Actualizar
              </Button>
              <div>
                {(loadingUpdatedById || loadingAllResFromServer) && (
                  <LoadingBox />
                )}
              </div>
            </form>
          </div>

          <div className="reservation-edit-card">
            <ReservationCardM
              mariachiData={mariachiData}
              reservation={reservation}
              dateTime={selectedDate}
              clientData={clientData}
              price={price}
              playlist={playlist}
              editClient={true}
            />
          </div>
        </div>
      )}

      <style jsx>
        {`
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
          .reservation-edit-container {
            display: flex;
            justify-content: space-around;
            align-items: top;
            flex-wrap: wrap;
          }
          .reservation-edit {
            width: 60vh;
            height: auto;
            padding: 5vh;
            margin-bottom: 2vh;
            border-radius: 1rem;
            /* other styles */
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
            -webkit-backdrop-filter: blur(10px);
          }
          .reservation-edit-card {
            width: 60vh;
            height: auto;
          }
          p,
          a {
            margin-top: -12px;
            font-size: 1rem;
            text-align: left;
          }

          a {
            color: #4d4ae8;
            text-decoration: none;
          }

          li {
            text-align: left;
            margin-left: 5vh;
          }

          /* The container must be positioned relative: */
          .custom-select {
            display: flex;
            flex-direction: column;
            flex: 1;
            padding-bottom: 2vh;
          }
          .custom-select > .select-selected {
          }

          .custom-select > .select-items {
            position: absolute;
            background-color: DodgerBlue;
            top: 100%;
            left: 0;
            right: 0;
            z-index: 99;
          }
        `}
      </style>
    </>
  )
}

export default ReservationEditDetails
