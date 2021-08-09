import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  addCoordinatorToNewMariachi,
  addMariachiToNewmariachi,
  addServiceToNewMariachi,
  addImagesFromDrive,
  addVideosFromDrive,
  editMariachiDetails,
  handleImageChangeMariachiLogo,
} from '@redux/mariachi/mariachi.actions'

import { useRouter } from 'next/router'

import EditIcon from '@material-ui/icons/Edit'
import LoadingBox from '@components/LoadingBox'
import MariachiCardAnimation from '@components/MariachiCard/MariachiCardAnimation'
import CoordinatorData from '@components/FormSections/CoordinatorData'
import MariachiNewData from '@components/FormSections/MariachiNewData'
import ServicesData from '@components/FormSections/ServicesData'
import MediaData from '@components/FormSections/MediaData'
import FormSteps from '@components/FormSections/FormSteps'
import {
  CLEAR_DATA_UPDATE_MARIACHI,
  CLEAR_NEW_MARIACHI_DATA_LOCALSTORAGE,
} from '@redux/mariachi/mariachi.types'

const MariachiEditDetails = () => {
  const router = useRouter()
  const { mariachiToEdit, coordinatorMarToEdit, goBack } = useSelector(
    (state) => state.mariachiToEdit
  )

  const { stepForm } = useSelector((state) => state.addMariachiDataLocal)
  const { loadingImageMariachi } = useSelector(
    (state) => state.uploadMariachiImage
  )

  const dispatch = useDispatch()

  const handleImagePicture = () => {
    const fileInput = document.getElementById('imageInputAdminMariachi')
    fileInput.click()
  }

  /******************************************
   *
   *
   ******************************************/

  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [userName, setUserName] = useState('')
  const [phone, setPhone] = useState('')
  const [instruName, setInstruName] = useState([])

  const [nameMariachi, setNameMariachi] = useState('')
  const [description, setDescription] = useState('')
  const [imageLogo, setImageLogo] = useState('')

  const [servicesValues, setServicesValues] = useState({})

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
      await dispatch({ type: CLEAR_DATA_UPDATE_MARIACHI })
      await dispatch({ type: CLEAR_NEW_MARIACHI_DATA_LOCALSTORAGE })

      router.push('/admin')
    }
  }, [goBack])

  useEffect(async () => {
    if (coordinatorMarToEdit?.nameClient) {
      setFullName(coordinatorMarToEdit.nameClient)
      setEmail(coordinatorMarToEdit.email)
      setUserName(coordinatorMarToEdit.userName)
      setPhone(coordinatorMarToEdit.phone)
      setInstruName(coordinatorMarToEdit.instrument)
      await dispatch(
        addCoordinatorToNewMariachi({
          fullName,
          email,
          userName,
          phone,
          instrument: instruName,
        })
      )
    }
  }, [coordinatorMarToEdit])

  useEffect(async () => {
    if (mariachiToEdit?.name) {
      setNameMariachi(mariachiToEdit.name)
      setDescription(mariachiToEdit.description)
      setImageLogo(mariachiToEdit.imageLogo)
      setServicesValues(mariachiToEdit.service_price)
      await dispatch(
        addMariachiToNewmariachi({
          nameMariachi,
          description,
        })
      )
      await dispatch(addServiceToNewMariachi(servicesValues))
    }

    // dispatch(addImagesFromDrive(mariachiToEdit.images))
    // dispatch(addVideosFromDrive(mariachiToEdit.videos))
  }, [mariachiToEdit])

  useEffect(() => {
    if (mariachiToEdit?.images) {
      dispatch(addImagesFromDrive(mariachiToEdit.images))
      dispatch(addVideosFromDrive(mariachiToEdit.videos))
    }
  }, [mariachiToEdit])

  useEffect(() => {
    if (stepForm <= 3) {
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

  const coordinatorD = {
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
    imageLogo,
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
    <CoordinatorData coordinator={coordinatorD} updateMariachi={true} />
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

  const handleSaveMariachiUpdate = (e) => {
    e.preventDefault()
    dispatch(editMariachiDetails())
  }

  return (
    <div className="mariachi-container">
      <div className="mariachi-add-form">
        <div>
          <img src={imageLogo} alt={mariachiToEdit?.name} />
          <input
            type="file"
            id="imageInputAdminMariachi"
            hidden="hidden"
            onChange={(e) =>
              dispatch(
                handleImageChangeMariachiLogo(e, mariachiToEdit?.mariachiId)
              )
            }
          />
          <span>
            <EditIcon
              onClick={handleImagePicture}
              style={{ color: '#000', fontSize: '12px' }}
            />
          </span>
          <div>{loadingImageMariachi && <LoadingBox />}</div>
        </div>

        <div style={{ width: '100%' }}>
          <FormSteps
            options={options}
            formsTemplete={formsTemplete}
            handleSaveData={handleSaveMariachiUpdate}
          />
        </div>
      </div>

      <div className="mariachi-card-details">
        <MariachiCardAnimation
          coordinator={coordinatorD}
          mariachiD={mariachiD}
          services={servicesValues}
          select="mariachiToEdit"
        />
      </div>
      <style jsx>
        {`
          .mariachi-container {
            min-height: 45vh;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap;

            background-color: rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
            -webkit-backdrop-filter: blur(10px);
          }

          .mariachi-card-details {
            width: 45%;
            min-width: 55vh;
          }
          .mariachi-add-form {
            width: 45%;
            min-width: 55vh;
          }
          img {
            width: 180px;
            height: 94px;
            border-radius: 10px;
          }

          .card {
            width: 400px;
            height: auto;
            padding: 2rem;
            border-radius: 1rem;
            /* other styles */
            background: rgba(255, 255, 255, 0.2);
            -webkit-backdrop-filter: blur(10px);
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
        `}
      </style>
    </div>
  )
}

export default MariachiEditDetails
