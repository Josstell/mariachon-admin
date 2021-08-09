import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllResevasAdmin,
  sendReservationToWhatsAppAndUpdatState,
} from '@redux/reservations/reservations.actions'
import ReservationCardAll from '@components/ReservationCardAll'
import ReservasSearchButton from '@components/Search/ReservasSearchButton'
import SearchInput from '@components/FormSections/SearchInput'
import { AddReservationIcon } from '@components/IconsSvg'

const ReservationsAdmin = () => {
  // const allReservations = useSelector((state) => state.allReservations)
  // const allUsers = useSelector((state) => state.allUsers);
  // const allMariachis = useSelector((state) => state.allMariachis);

  const router = useRouter()

  const [searchACMC, setSearchACMC] = useState(0)
  const [byName, setByName] = useState('')

  const allReservationsAdmin = useSelector(
    (state) => state.allReservationsAdmin
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllResevasAdmin())
  }, [])

  const handleButtons = (name) => {
    setSearchACMC(name)
    setByName('')
  }

  const [reservas, setReservas] = useState(allReservationsAdmin)

  useEffect(() => {
    let reservasSearhched = allReservationsAdmin

    switch (searchACMC) {
      case 1:
        if (byName !== '') {
          reservasSearhched = reservasSearhched.filter(
            (reservas) =>
              reservas.status.toLowerCase().indexOf(byName.toLowerCase()) !== -1
          )
        }

        break
      case 2:
        if (byName !== '') {
          reservasSearhched = reservasSearhched.filter(
            (reservas) =>
              reservas.mariachiData.nameMariachi
                .toLowerCase()
                .indexOf(byName.toLowerCase()) !== -1
          )
        }
        break
      case 3:
        if (byName !== '') {
          reservasSearhched = reservasSearhched.filter(
            (reservas) =>
              reservas.client.nameClient
                .toLowerCase()
                .indexOf(byName.toLowerCase()) !== -1
          )
        }
        break

      default:
        if (byName !== '') {
          reservasSearhched = reservasSearhched.filter(
            (reservas) =>
              reservas.reservationId
                .toLowerCase()
                .indexOf(byName.toLowerCase()) !== -1
          )
        }
        break
    }

    setReservas(reservasSearhched)
  }, [searchACMC, byName])

  const keyWords = {
    todos: 'Id',
    pendiente: 'estado de la reserva',
    mariachi: 'mariachi',
    cliente: 'cliente',
  }

  const handleWhatsApp = (reserva) => {
    dispatch(sendReservationToWhatsAppAndUpdatState(reserva))
  }

  return (
    <div className="resevation-container">
      <SearchInput
        searchACMC={searchACMC}
        keyWords={keyWords}
        setByName={setByName}
      />
      <div className="reser-details-buttons-search">
        <div className="reser-details-buttons">
          <ReservasSearchButton
            handleButtons={handleButtons}
            buttonsEnabled={keyWords}
          />
          <div
            className="reser-button-add"
            onClick={() => router.push('/create/reservation?admin=useredit')}
          >
            <div style={{ marginTop: 10 }}>
              <AddReservationIcon style={{ width: 25 }} />
            </div>
            <p>Nueva reserva</p>
          </div>
        </div>
      </div>

      <div className="reservations-cards-container">
        {reservas?.map((reser) => (
          <ReservationCardAll
            reservation={reser}
            key={reser.reservationId}
            handleWhatsApp={handleWhatsApp}
          />
        ))}
      </div>
      <style jsx>
        {`
          .reser-details-buttons-search {
            display: flex;
            flex-direction: column;
          }
          .reser-details-buttons {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
          }
          .reser-button-add {
            display: flex;
            flex: 1;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: auto;
            min-width: 150px;
            padding-top: 0.8vh;
            padding-bottom: 0.8vh;
            background-color: rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
            -webkit-backdrop-filter: blur(10px);
            cursor: pointer;
          }
          .reser-button-add :hover {
            background-color: rgba(49, 58, 166, 0.2);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
          }

          .resevation-container {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            margin: 1vh 8vh;
          }

          .reservations-cards-container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: center;
            margin-top: 5vh;
          }
          p {
            font-size: 10px;
            margin-top: -5px;
          }
        `}
      </style>
    </div>
  )
}

export default ReservationsAdmin
