import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import UserColumnDetails from '@components/UserColumnDetails'
import HeaderAdmin from '@components/HeaderAdmin'
import PrivateRoute from '@components/PrivateRoute'
import MariachiAddNew from '@components/MariachiAddNew'

const NewMariachi = () => {
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
        <MariachiAddNew />
      </UserColumnDetails>
    </PrivateRoute>
  )
}

export default NewMariachi
