import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { setMariachiToEdit } from '@redux/mariachi/mariachi.actions'
import HeaderAdmin from '@components/HeaderAdmin'
import UserColumnDetails from '@components/UserColumnDetails'
import MariachiEditDetails from '@components/MariachiEditDetails'
import PrivateRoute from '@components/PrivateRoute'
import { setAllUsers } from '@redux/users/users.actions'
import { getDataMariachis, getDataParams, getDataUsers } from '@helpers/apis'

const EditMariachi = ({ mariachi, usersData }) => {
  const router = useRouter()
  const users = useSelector((state) => state.users)
  const { credentials, loadingImage } = users

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAllUsers(usersData))

    dispatch(setMariachiToEdit(mariachi))
  }, [])

  return (
    <PrivateRoute>
      <HeaderAdmin />
      <UserColumnDetails
        loadingImage={loadingImage}
        credentials={credentials}
        option={router.query.admin}
      >
        <MariachiEditDetails />
      </UserColumnDetails>
    </PrivateRoute>
  )
}

export async function getStaticPaths() {
  let resMariachis = []

  getDataMariachis()
    .then((data) => {
      resMariachis = data
    })
    .catch((error) => {
      console.log(error)
    })

  const paths = await resMariachis.map((path) => ({
    params: { mariachiId: path.mariachiId.toString() },
  }))

  return { paths, fallback: false }
}

// // This gets called on every request
export async function getStaticProps(context) {
  // Fetch data from external API

  if (context.preview === undefined) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  let resUsers = []
  let resMariachis = []
  let parameters = []

  if (context.previewData.role === 'admin') {
    getDataUsers()
      .then((data) => {
        resUsers = data
      })
      .catch((err) => {
        console.log(err)
      })

    getDataMariachis()
      .then((data) => {
        resMariachis = data
      })
      .catch((error) => {
        console.log(error)
      })

    getDataParams()
      .then((data) => {
        parameters = data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  console.log('parametros', parameters)

  const mariachis = await resMariachis

  const usersData = await resUsers

  const params = await parameters

  const mariachi = await mariachis.filter(
    (mar) => mar.mariachiId.toString() === context.params.mariachiId
  )

  console.log('mariachi', mariachi)

  // if (!mariachis) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   }
  // }

  // Pass data to the page via props
  return {
    props: {
      usersData,
      mariachi: mariachi[0],
      params,
    },
  }
}

export default EditMariachi
