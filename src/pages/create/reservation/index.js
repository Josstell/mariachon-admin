import { useSelector } from 'react-redux'
import HeaderAdmin from '@components/HeaderAdmin'
import UserColumnDetails from '@components/UserColumnDetails'
import PrivateRoute from '@components/PrivateRoute'
import ReservationAddNew from '@components/ReservationAddNew'
import { useRouter } from 'next/router'

const NewReservation = () => {
  const router = useRouter()
  const users = useSelector((state) => state.users)
  const { credentials, loadingImage } = users
  return (
    <PrivateRoute>
      <HeaderAdmin />
      <UserColumnDetails
        loadingImage={loadingImage}
        credentials={credentials}
        option={router.query.admin}
      >
        <ReservationAddNew />
      </UserColumnDetails>
    </PrivateRoute>
  )
}

export default NewReservation
