import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import LoadingCenter from '@components/LoadingCenter'

const PrivateRoute = ({ children }) => {
  const router = useRouter()

  const users = useSelector((state) => state.users)
  const { authenticated } = users

  useEffect(() => {
    if (users === {}) {
      return router.push('/admin')
    }

    if (users && authenticated === false && !users.credentials?.role) {
      router.push('/login')
    }
  }, [users])

  if (authenticated === true) {
    return children
  }
  return <LoadingCenter />
}

export default PrivateRoute
