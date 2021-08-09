import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getReservationByIdAPI } from '@redux/reservations/reservations.actions'
import HeaderAdmin from '@components/HeaderAdmin'
import UserColumnDetails from '@components/UserColumnDetails'
import ReservationEditDetails from '@components/ReservationEditDetails'
import PrivateRoute from '@components/PrivateRoute'

const EditReservation = () => {
  const router = useRouter()
  const users = useSelector((state) => state.users)
  const { credentials, loadingImage } = users
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(setReservationToEdit(router.query.reservationId))
    dispatch(getReservationByIdAPI(router.query.reservationId))
  }, [])

  return (
    <PrivateRoute>
      <HeaderAdmin />
      <UserColumnDetails
        loadingImage={loadingImage}
        credentials={credentials}
        option={router.query.admin}
      >
        <ReservationEditDetails />
      </UserColumnDetails>
    </PrivateRoute>
  )
}

export default EditReservation
