import { useEffect, useState } from 'react'
// import { useSelector } from "react-redux"
import Link from 'next/link'
import { LogoMariachon } from '@components/Logo'

// import { makeStyles } from "@material-ui/core/styles"
// import ModalUser from "@components/ModalUser"
// import ModalImgVid from "@components/ModalImgVid"
// import { addNewMariachi } from "@redux/mariachi/mariachi.actions"
// import { clearAddNewUser } from "@redux/users/users.actions"
import { useRouter } from 'next/router'

import FormSteps from '@components/FormSections/FormSteps'

import ServicesData from '@components/FormSections/ServicesData'
import MediaData from '@components/FormSections/MediaData'
import MariachiNewData from '@components/FormSections/MariachiNewData'
import CoordinatorData from '@components/FormSections/CoordinatorData'
import MariachiCardAnimation from '@components/MariachiCard/MariachiCardAnimation'
import { useDispatch, useSelector } from 'react-redux'

import {
  addCoordinatorToNewMariachi,
  addMariachiToNewmariachi,
  addNewMariachi,
  addServiceToNewMariachi,
} from '@redux/mariachi/mariachi.actions'
import {
  CLEAR_ADD_NEW_MARIACHI,
  CLEAR_NEW_MARIACHI_DATA_LOCALSTORAGE,
} from '@redux/mariachi/mariachi.types'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     flexDirection: "column",
//     backgroundColor: "rgba(255, 255, 255, 0.2)",
//   },
//   modal: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   paper: {
//     backgroundColor: theme.palette.background.paper,
//     border: "1px solid rgba(255, 255, 255,0.5)",
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
//   formControl: {
//     margin: theme.spacing(2),
//     minWidth: 150,
//   },
//   demo: {
//     backgroundColor: "rgba(193, 198, 215, 0.3)",
//   },
//   title: {
//     margin: theme.spacing(4, 0, 2),
//   },
//   dividerSpace: {
//     marginBottom: "1vh",
//   },
//   button: {
//     marginRight: theme.spacing(1),
//   },
//   backButton: {
//     marginRight: theme.spacing(1),
//   },
//   completed: {
//     display: "inline-block",
//   },
//   instructions: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     fontWeight: theme.typography.fontWeightRegular,
//   },
// }))

const MariachiAddNew = () => {
  // const userAddNew = useSelector((state) => state.userAddNew)
  // const { services } = useSelector((state) => state.parameterForReservations)
  // const allUsers = useSelector((state) => state.allUsers)

  // const { imagesFromDrive, videosFromYouTube } = useSelector(
  //   (state) => state.addImagesOrVideos
  // )

  // const servicios = Object.getOwnPropertyNames(services)
  // const coordinators = allUsers.filter((user) => user.role === "coordinator")

  // eslint-disable-next-line no-sequences
  // const res = servicios.reduce((acc, curr) => ((acc[curr] = 0), acc), {})

  // const Hora = useRef(0)
  // const Serenata = useRef(0)

  // const [serviceMethods, setServiceMethods] = useState(res)
  // const [servicesSelect, setServicesSelect] = useState([])

  // const handleChangeService = (e) => {
  //   e.preventDefault()

  //   setServiceMethods({
  //     ...serviceMethods,
  //     [e.target.name]: e.target.value,
  //   })
  // }

  // const handleChangeSelect = (e) => {
  //   e.preventDefault()
  //   const values = [...e.target.selectedOptions].map((opt) => opt.value)
  //   setServicesSelect(values)
  // }

  // const dispatch = useDispatch()

  // const handleChangeSelectUser = (e) => {
  //   e.preventDefault()
  // }

  // const handleCreateCoordinatorOpen = (e) => {
  //   e.preventDefault()
  //   setOpen(true)
  // }

  // const handleModalAddImage = (e) => {
  //   e.preventDefault()
  //   setOpenAddImg(true)
  // }

  // const handleModalAddVideo = (e) => {
  //   e.preventDefault()
  //   setOpenAddVid(true)
  // }

  // const NewMariachi = useSelector((state) => state.NewMariachi)

  // useEffect(() => {
  //   if (NewMariachi.goBack) {
  //     nameMariachi.current.value = ""
  //     description.current.value = ""
  //     setServiceMethods(res)

  //     dispatch(clearAddNewUser())
  //     dispatch(clearAddImagesVideos())
  //     dispatch({
  //       type: "CLEAR_ADD_NEW_MARIACHI",
  //     })
  //     router.push("/admin")
  //   }
  // }, [NewMariachi])

  // const handleSubmit = (e) => {
  //   e.preventDefault()

  //   const newMariachi = {
  //     name: nameMariachi.current.value,
  //     description: description.current.value,
  //     service_price: {},
  //     images: imagesFromDrive,
  //     videos: videosFromYouTube,
  //   }

  //   serviceMethods.hour !== 0 &&
  //     (newMariachi.service_price.Hora = serviceMethods.hour)

  //   serviceMethods.serenata !== 0 &&
  //     (newMariachi.service_price.Serenata = serviceMethods.serenata)

  //   serviceMethods.contract !== 0 &&
  //     (newMariachi.service_price.Contrato = serviceMethods.contract)

  //   newMariachi.userName = userAddNew.userName

  //   dispatch(addNewMariachi(userAddNew, newMariachi))
  // }

  /****************************************************************
   * ***********************************
   */

  // const [disableBtn, setDisableBtn] = useState(false)

  // const getSteps = () => {
  //   return [
  //     "Datos del Coordinador",
  //     "Datos del Mariachi",
  //     "Fotos y videos",
  //     "Precios y servicios",
  //   ]
  // }

  // function getStepContent(step, params) {
  //   switch (step) {
  //     case 0:
  //       setDisableBtn(true)

  //       return ClientData(params)

  //     case 1:
  //       setDisableBtn(true)

  //       return "<MariachiData params={params} />"
  //     case 2:
  //       setDisableBtn(true)

  //       return ClientData(params)
  //     case 3:
  //       setDisableBtn(true)
  //       return ClientData(params)

  //     default:
  //       return "Unknown step"
  //   }
  // }

  // const params = {
  //   getSteps,
  //   getStepContent,
  //   disableBtn,
  //   action: {
  //     form: "Agregar Mariachi",
  //     typeUser: "coordinador",
  //   },
  // }

  const router = useRouter()
  const { stepForm, coordinatorData, mariachiData, serviceDat } = useSelector(
    (state) => state.addMariachiDataLocal
  )

  const { goBack } = useSelector((state) => state.NewMariachi)

  const dispatch = useDispatch()

  useEffect(async () => {
    await dispatch({ type: CLEAR_ADD_NEW_MARIACHI })
  }, [])

  useEffect(async () => {
    if (goBack) {
      setEmail('')
      setFullName('')
      setUserName('')
      setPhone('')
      setInstruName('')
      setNameMariachi('')
      setDescription('')
      setServicesValues({})
      await dispatch({ type: CLEAR_ADD_NEW_MARIACHI })
      await dispatch({ type: CLEAR_NEW_MARIACHI_DATA_LOCALSTORAGE })

      router.push('/admin')
    }
  }, [goBack])

  useEffect(() => {
    if (stepForm <= 3 && !goBack) {
      if (stepForm !== 0) {
        dispatch(
          addCoordinatorToNewMariachi({
            fullName,
            email,
            userName,
            phone,
            instrument: instruName,
          })
        )
      }

      if (stepForm !== 1) {
        dispatch(
          addMariachiToNewmariachi({
            nameMariachi,
            description,
          })
        )
      }
      if (stepForm !== 2) {
        dispatch(addServiceToNewMariachi(servicesValues))
      }
    }
    // if (stepForm !== 3) {
    // }
  }, [stepForm])

  const [email, setEmail] = useState(
    coordinatorData.email ? coordinatorData.email : ''
  )
  const [fullName, setFullName] = useState(
    coordinatorData.fullName ? coordinatorData.fullName : ''
  )
  const [userName, setUserName] = useState(
    coordinatorData.userName ? coordinatorData.userName : ''
  )
  const [phone, setPhone] = useState(
    coordinatorData.phone ? coordinatorData.phone : ''
  )
  const [instruName, setInstruName] = useState(
    coordinatorData.instruName ? coordinatorData.instruName : []
  )

  const [nameMariachi, setNameMariachi] = useState(
    mariachiData.nameMariachi ? mariachiData.nameMariachi : ''
  )
  const [description, setDescription] = useState(
    mariachiData.description ? mariachiData.description : ''
  )

  const [servicesValues, setServicesValues] = useState(serviceDat)

  const coordinator = {
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
  }

  const mariachiD = {
    nameMariachi,
    setNameMariachi,
    description,
    setDescription,
  }

  const serviceD = {
    values: servicesValues,
    setValues: setServicesValues,
  }

  const options = [
    { step: 'Coordinador', optional: false, active: false },
    { step: 'Mariachi', optional: false, active: false },
    { step: 'Servicios', optional: true, active: false },
    { step: 'Media', optional: true, active: false },
  ]

  const clientData = () => (
    <CoordinatorData coordinator={coordinator} updateMariachi={false} />
  )
  const mariachiDat = () => <MariachiNewData mariachiD={mariachiD} />
  const servicesAndPrices = () => <ServicesData serviceD={serviceD} />
  const media = () => <MediaData />

  const formsTemplete = [
    clientData(),
    mariachiDat(),
    servicesAndPrices(),
    media(),
  ]

  const handleSaveMariachiNew = (e) => {
    e.preventDefault()

    dispatch(addNewMariachi())
  }
  return (
    <div className="mariachi-add-container">
      <div className="mariachi-add-form">
        <Link href="/">
          <div className="mariachi-add-logo">
            <LogoMariachon
              width={180}
              height={60}
              color1="#000"
              color2="#000"
            />
          </div>
        </Link>
        {/* 
        <div>
          <form type="submit">
            <div className="form-login">
              <div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nombre comercial del Mariachi"
                  ref={nameMariachi}
                  required
                />
              </div>

              <div>
                <button
                  onClick={handleCreateCoordinatorOpen}
                  className="form-button"
                >
                  Crear nuevo coordinador
                </button>
              </div>
              <div>
                <label htmlFor="userSelect">
                  Selecciona un coordinador existente:
                </label>
                <select id="userSelect" onChange={handleChangeSelectUser}>
                  {coordinators?.map((user, index) => (
                    <option key={index} value={user.userId}>
                      {user.fullName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="servicesSelect">
                  Selecciona tus servicios:
                </label>
                <select
                  id="servicesSelect"
                  onChange={handleChangeSelect}
                  multiple
                >
                  {servicios?.map((type, index) => (
                    <option key={index} value={type}>
                      {services[type]}
                    </option>
                  ))}
                </select>
              </div>

              {servicesSelect &&
                servicesSelect.map((ser, index) => (
                  <div key={index}>
                    <label htmlFor={ser}>{services[ser]} :</label>
                    <input
                      id={ser}
                      type="number"
                      key={index}
                      className="form-input"
                      name={ser}
                      placeholder={`Precion por ${services[ser]}`}
                      value={serviceMethods[ser]}
                      onChange={handleChangeService}
                    />
                  </div>
                ))}

              <div>
                <textarea
                  type="text"
                  className="form-input"
                  placeholder="Descripción del mariachi"
                  ref={description}
                />
              </div>
              <div>
                <button onClick={handleModalAddImage} className="form-button">
                  Agregar imagenes
                </button>
              </div>

              <div>
                <button onClick={handleModalAddVideo} className="form-button">
                  Agregar Videos
                </button>
              </div>

              <div>
                <button className="form-button" onClick={handleSubmit}>
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
 */}

        {/*********
         ********************************************************************************
         */}
        <div style={{ width: '100%' }}>
          <FormSteps
            options={options}
            formsTemplete={formsTemplete}
            handleSaveData={handleSaveMariachiNew}
          />
        </div>
      </div>

      <div className="mariachi-card-details">
        <MariachiCardAnimation
          coordinator={coordinator}
          mariachiD={mariachiD}
          services={servicesValues}
          select="NewMariachi"
        />
      </div>

      <style jsx>
        {`
          .mariachi-add-container {
            min-height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;

            background-color: rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
            -webkit-backdrop-filter: blur(10px);
          }

          .mariachi-add-logo {
            margin-bottom: 5vh;
          }
          .mariachi-add-form {
            display: flex;
            flex-direction: column;
            padding: 5vh;
            text-align: center;
            margin: 0px 50px 0px 50px;
            width: 45%;
            min-width: 55vh;
            background-color: rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
            -webkit-backdrop-filter: blur(10px);
          }

          .mariachi-card-details {
            width: 45%;
            min-width: 55vh;
          }

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
        `}
      </style>
    </div>
  )
}

export default MariachiAddNew
