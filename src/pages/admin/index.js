/* eslint-disable import/no-unresolved */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react'
import PrivateRoute from '@components/PrivateRoute'
import { useDispatch, useSelector } from 'react-redux'
import { setAllUsers } from '@redux/users/users.actions'

import DetailsAdmin from '@components/DetailsAdmin'
import UsersAdmin from '@components/UsersAdmin'
import MariachisAdmin from '@components/MariachisAdmin'
import ReservationsAdmin from '@components/ReservationsAdmin'

import { setAllMariachis } from '@redux/mariachi/mariachi.actions'
import {
  setAllReservations,
  setAllReserParameters,
} from '@redux/reservations/reservations.actions'
import HeaderAdmin from '@components/HeaderAdmin'
import UserColumnDetails from '@components/UserColumnDetails'
import {
  getDataMariachis,
  getDataParams,
  getDataReservations,
  getDataUsers,
} from '@helpers/apis'

const HomeAdmin = (props) => {
  const usersData = props.users
  const mariachisData = props.mariachis
  const reservationsData = props.resevations
  const reservationsParams = props.params

  const users = useSelector((state) => state.users)
  const optionUserAd = useSelector((state) => state.optionUserAd)

  const { credentials, loadingImage } = users
  const dispatch = useDispatch()

  useEffect(() => {
    if (optionUserAd === 1) {
      dispatch(setAllUsers(usersData))
    }
    dispatch(setAllMariachis(mariachisData))
    dispatch(setAllReservations(reservationsData))
    dispatch(setAllReserParameters(reservationsParams))
  }, [])

  return (
    <PrivateRoute>
      {/* /* Header */}
      <HeaderAdmin />

      <UserColumnDetails loadingImage={loadingImage} credentials={credentials}>
        {optionUserAd === 1 ? (
          <DetailsAdmin />
        ) : optionUserAd === 2 ? (
          <UsersAdmin />
        ) : optionUserAd === 3 ? (
          <MariachisAdmin />
        ) : (
          <ReservationsAdmin />
        )}
      </UserColumnDetails>

      <style jsx>
        {`
          .admin-options {
            border-top: solid 0.5px;
          }

          img {
            width: 100px;
            border: rgba(0, 0, 0, 0.1) solid 1px;
            border-radius: 80px;
          }
          .admin_home_container {
            background: rgba(230, 230, 230, 0.5);
            padding-top: 3vh;
            display: grid;
            grid-template-rows: 20vh 70vh;
            grid-template-columns: repeat(12, 1fr);
            grid-gap: 1px;
            grid-template-areas: '  admin admin admin admin admin admin admin admin admin admin admin admin' ' details details details details details details details details details details details . ';
          }
          .admin_home_admin {
            grid-area: admin;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            margin-left: 2vh;
            margin-right: 2vh;
          }
          .admin-image {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            border-right: rgba(0, 0, 0, 0.5) solid 1px;
            padding-right: 1vh;
          }
          .admin-user-menu {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-left: 1vh;
          }
          .admin-user-details {
            margin-bottom: 2vh;
          }
          .admin-menu {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
          }
          .admin-menu > .admin-menu-details {
            padding: 2px;
            margin-bottom: 2vh;
          }
          .admin_home_details {
            grid-area: details;
            text-align: center;
          }

          @media (min-width: 900px) {
            .admin_home_container {
              grid-template-rows: 90vh;
              grid-template-areas: ' admin admin details details details details details details details details details . ';
            }
            .admin_home_admin {
              flex-direction: column;
              justify-content: flex-start;
              align-items: center;
              border-right: rgba(0, 0, 0, 0.1) solid 1px;
            }
            .admin-image {
              flex-direction: column;
              align-items: center;
              border-right: rgba(0, 0, 0, 0) solid 1px;
            }
            .admin-menu {
              flex-direction: column;
              margin-top: 3vh;
              padding: 5px;
              border-top: rgba(0, 0, 0, 0.1) solid 1px;
            }

            .admin-user-menu {
              margin-top: 4vh;
            }

            .admin-menu > .admin-menu-details {
              padding: 2px;
              margin-bottom: 2vh;
            }
          }
        `}
      </style>
    </PrivateRoute>
  )
}

// // This gets called on every request
export async function getServerSideProps(context) {
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
  let resResevations = []
  let parameters = []

  if (context.previewData.role === 'admin') {
    await getDataUsers()
      .then((data) => {
        resUsers = data
      })
      .catch((err) => {
        console.log(err)
      })

    await getDataMariachis()
      .then((data) => {
        resMariachis = data
      })
      .catch((error) => {
        console.log(error)
      })
    await getDataParams()
      .then((data) => {
        parameters = data
      })
      .catch((error) => {
        console.log(error)
      })

    await getDataReservations()
      .then((data) => {
        resResevations = data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // const resResevations = await axios.get(
  //   `${URL_API}/api/reservation/get/all?role=${context.previewData.role}&?userId=${context.previewData.userId}`
  // )

  console.log('parametros', parameters)

  const users = await resUsers
  const resevations = await resResevations
  const mariachis = await resMariachis
  const params = await parameters

  if (!users || !resevations || !mariachis) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  console.log('parametros', params)
  // Pass data to the page via props
  return {
    props: {
      users,
      mariachis,
      resevations,
      params,
    },
  }
}

export default HomeAdmin
