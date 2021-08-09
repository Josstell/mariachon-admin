import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { setUsertoEdit } from '@redux/users/users.actions'
import HeaderAdmin from '@components/HeaderAdmin'
import UserColumnDetails from '@components/UserColumnDetails'
import UserEditDetails from '@components/UserEditDetails'
import PrivateRoute from '@components/PrivateRoute'

const EditUser = () => {
  const router = useRouter()

  const users = useSelector((state) => state.users)
  const { credentials, loadingImage } = users

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUsertoEdit(router.query.userId))
  }, [])

  return (
    <PrivateRoute>
      <HeaderAdmin />
      <UserColumnDetails
        loadingImage={loadingImage}
        credentials={credentials}
        option={router.query.admin}
      >
        <UserEditDetails />
      </UserColumnDetails>
    </PrivateRoute>
  )
}

export default EditUser
