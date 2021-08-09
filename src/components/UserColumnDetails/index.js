import LoadingBox from '@components/LoadingBox'
import { useDispatch } from 'react-redux'
import {
  logoutUser,
  handleImageChange,
  handleImagePicture,
  setOptionToAdmin,
} from '@redux/users/users.actions'
import { useRouter } from 'next/router'
import EditIcon from '@material-ui/icons/Edit'

const UserColumnDetails = (props) => {
  const router = useRouter()

  const dispatch = useDispatch()
  const { loadingImage, credentials, option } = props

  const handlerSignup = () => {
    dispatch(logoutUser())
  }

  const handleOptions = (options, option) => {
    if (option === 'useredit') {
      dispatch(setOptionToAdmin(options))

      return router.push('/admin')
    }
    return dispatch(setOptionToAdmin(options))
  }

  return (
    <div className="admin_home_container">
      <div className="admin_home_admin">
        <div className="admin-image">
          <div>
            <img src={credentials.imageUrl} alt={credentials.fullName} />
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={(e) =>
                dispatch(handleImageChange(e, credentials.userId))
              }
            />
            <span>
              <EditIcon
                onClick={() => dispatch(handleImagePicture())}
                style={{ color: '#000', fontSize: '12px' }}
              />{' '}
            </span>
          </div>
          <div>{loadingImage && <LoadingBox />}</div>
          <div className="admin-user-menu">
            <div className="admin-user-details">{credentials.userName}</div>

            <div className="admin-user-details">
              <span onClick={() => handleOptions(1, option)}>
                {credentials.fullName ? credentials.fullName : credentials.role}
              </span>
            </div>

            <div className="admin-user-details">
              <span onClick={() => handlerSignup}>Salir</span>{' '}
            </div>
          </div>
        </div>
        <div className="admin-menu">
          {credentials.role === 'admin' ? (
            <>
              <div className="admin-menu-details">
                <span onClick={() => handleOptions(2, option)}> Usuarios</span>
              </div>
              <div className="admin-menu-details">
                <span onClick={() => handleOptions(3, option)}> Mariachis</span>
              </div>
              <div className="admin-menu-details">
                <span onClick={() => handleOptions(4, option)}>
                  {' '}
                  Reservaciones
                </span>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div className="admin_home_details">{props.children}</div>

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
            grid-template-areas:
              '  admin admin admin admin admin admin admin admin admin admin admin admin'
              ' details details details details details details details details details details details details ';
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
            width: 100%;
          }

          @media (min-width: 900px) {
            .admin_home_container {
              grid-template-rows: 90vh;
              grid-template-areas: ' admin admin details details details details details details details details details details ';
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
    </div>
  )
}

export default UserColumnDetails
