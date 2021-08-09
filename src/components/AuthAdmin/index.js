import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import LoadingCenter from '@components/LoadingCenter'

const AuthAdmin = ({ children }) => {
  const router = useRouter()

  const users = useSelector((state) => state.users)
  const { authenticated } = users

  useEffect(() => {
    if (authenticated === true) {
      router.push('/admin')
    }
  }, [users])

  if (authenticated === false || authenticated === undefined) {
    return children
  }
  return <LoadingCenter />
}

export default AuthAdmin
