import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import { deepPurple } from '@material-ui/core/colors'

import { ArrowDown, EditPerson, ArrowUp } from '@components/IconsSvg/index'

const urlImage =
  'https://firebasestorage.googleapis.com/v0/b/mariachonauth-prod.appspot.com/o/no-image.png?alt=media'

const useStyles = makeStyles((theme) => ({
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  largePurple: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}))

const CardsAccordeonUsers = ({ searchACMC, byName }) => {
  const classes = useStyles()

  const router = useRouter()
  const allUsers = useSelector((state) => state.allUsers)

  const [users, setUsers] = useState(allUsers)

  // const [putArrowUpDown, setPutArrowUpDown] = useState(true)

  const [getId, setGetId] = useState('')

  useEffect(() => {
    let usersSearhched = allUsers

    switch (searchACMC) {
      case 2:
        usersSearhched = allUsers.filter((user) => user.role === 'client')
        break
      case 3:
        usersSearhched = allUsers.filter((user) => user.role === 'coordinator')
        break
      case 1:
        usersSearhched = allUsers.filter((user) => user.role === 'mariachi')
        break
      default:
        break
    }

    if (byName !== '') {
      usersSearhched = usersSearhched.filter(
        (users) =>
          users.fullName.toLowerCase().indexOf(byName.toLowerCase()) !== -1
      )
      // usersSearhched = usersSearhched.forEach(()=>{
      //   ...
      // })
    }

    setUsers(usersSearhched)
  }, [searchACMC, byName])

  // const [arrowUpAndDowm, setArrowUpDown] = useState([])

  // useEffect(() => {
  //   const data = users
  //   setArrowUpDown(
  //     data.fill().map((e, i) => {
  //       return { idx: false }
  //     })
  //   )
  // }, [users])

  console.log('Array boolean: ', users)

  return (
    <section>
      {users &&
        users.map((user) => (
          <details key={user?.email}>
            <summary onClick={() => setGetId(user.userId)}>
              {/* <summary onClick={() => setPutArrowUpDown(!putArrowUpDown)}> */}
              <div className="user-card">
                <div className="user-card-image">
                  {user?.imageUrl === urlImage ? (
                    <Avatar className={classes.purple}>
                      {user?.fullName.charAt(0)}
                    </Avatar>
                  ) : (
                    <Avatar alt={user?.fullName} src={user?.imageUrl} />
                  )}
                </div>
                <div className="user-name-arrow-down">
                  <div className="user-name">
                    <span>{user?.fullName}</span>
                  </div>
                  {/* {putArrowUpDown ? ( */}
                  {!(user.userId === getId) ? (
                    <ArrowDown
                      style={{ width: 15, position: 'absolute', right: 0 }}
                    />
                  ) : (
                    <ArrowUp
                      style={{ width: 15, position: 'absolute', right: 0 }}
                    />
                  )}
                </div>
              </div>
            </summary>
            <div className="card-userdetails">
              <div className="photo-and-details">
                <div className="card-userdetails-image">
                  {user?.imageUrl !== urlImage ? (
                    <div className="image-figure">
                      <figure>
                        <img src={user?.imageUrl} alt={user.fullName} />
                      </figure>
                    </div>
                  ) : (
                    <Avatar
                      alt={user?.fullName}
                      src={user?.imageUrl}
                      className={classes.large}
                    />
                  )}
                  {/* <p>{user?.userName}</p> */}
                  <p>{user?.role}</p>
                </div>

                <div className="card__userdetails">
                  <h3>{user.fullName}</h3>
                  <p>{user.userName}</p>
                  <hr className="horizontal-line" />

                  <ul>
                    <li>
                      <strong>Telefono: </strong>
                      {user?.phone}
                    </li>
                    <li>
                      <strong>Email: </strong>
                      {user?.email}
                    </li>
                    {/* {(user?.role === "mariachi" ||
                      user?.role === "coordinator") && (
                      <>
                        <strong>Instrumentos: </strong>
                        {user?.instrument[0]}...
                      </>
                    )} */}
                    <li>
                      <strong>Estado: </strong>
                      {user?.enable === true ? 'activo' : 'no activo'}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="button-handle">
                <div className="div-space"></div>
                <div className="button-card">
                  <EditPerson
                    onClick={() =>
                      router.push(`/edit/user/${user?.userId}?admin=useredit`)
                    }
                    style={{ width: 25, cursor: 'pointer' }}
                  />
                </div>
                {/* <SelectPerson
                style={{ width: 25, cursor: "pointer", marginLeft: 5 }}
              /> */}
              </div>
            </div>
          </details>
        ))}

      <style jsx>
        {`
          @import url('https://fonts.googleapis.com/css?family=Karla|Space+Mono');

          .image-figure {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 150px;
            height: 150px;
            border-radius: 100px;
            margin: 0;
          }

          img {
            width: 150px;
            height: 150px;
            object-fit: cover;
            border-radius: 100px;
          }

          .card-userdetails {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            flex-wrap: wrap;
          }

          .photo-and-details {
            width: 95%;
            height: 80%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-around;
          }

          .card__userdetails {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            width: 65%;
            min-width: 260px;
          }

          .card-userdetails-image {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 35%;
            min-width: 20vh;
          }

          .button-handle {
            width: 100%;
            height: 20%;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }

          .button-card {
            position: relative;
            right: 0;
          }

          .div-space {
            width: 80%;
          }

          .user-card {
            display: flex;
            justify-content: start;
            align-items: center;
            position: relative;
          }
          .user-card-image {
            margin-right: 5vh;
          }
          .user-name-arrow-down {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .user-name-arrow-up {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          section {
            max-width: var(--sectionWidth);
            width: 70%;
            min-width: 45vh;
            color: #000;
            display: flex;
            flex-direction: column;
            margin-left: auto;
            margin-right: auto;
          }

          summary {
            display: block;
            cursor: pointer;
            padding: 10px;
            font-family: 'Space Mono', monospace;
            font-size: 22px;
            transition: 0.3s;
            user-select: none;
          }

          details {
            margin-bottom: 1vh;
            border: rgba(0, 0, 0, 0.4) solid 0px;
            border-radius: 20px;
            background: rgba(220, 220, 220, 0.5);
            width: 100%;
          }
          details > div {
            display: flex;
            flex-wrap: wrap;
            overflow: auto;
            height: 100%;
            user-select: none;
            padding: 0 20px;
            font-family: 'Karla', sans-serif;
            line-height: 1.5;
          }

          details > div > img {
            align-self: flex-start;
            max-width: 100%;
            margin-top: 20px;
          }

          details > div > p {
            flex: 1;
          }

          details[open] > summary {
            color: rgba(65, 86, 144, 1);
          }

          details[open] > summary > .user-card > .user-card-image {
            visibility: hidden;
          }

          details[open]
            > summary
            > .user-card
            > .user-name-arrow-down
            > .user-name {
            visibility: hidden;
          }
          @media (min-width: 768px) {
            details[open] > div > p {
              opacity: 0;
              animation-name: showContent;
              animation-duration: 0.6s;
              animation-delay: 0.2s;
              animation-fill-mode: forwards;
              margin: 0;
              padding-left: 20px;
            }

            details[open] > div {
              animation-name: slideDown;
              animation-duration: 0.3s;
              animation-fill-mode: forwards;
            }

            details[open] > div > img {
              opacity: 0;
              height: 100%;
              margin: 0;
              animation-name: showImage;
              animation-duration: 0.3s;
              animation-delay: 0.15s;
              animation-fill-mode: forwards;
            }
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              height: 0;
              padding: 0;
            }

            to {
              opacity: 1;
              height: var(--contentHeight);
              padding: 20px;
            }
          }

          @keyframes showImage {
            from {
              opacity: 0;
              clip-path: inset(50% 0 50% 0);
              transform: scale(0.4);
            }

            to {
              opacity: 1;
              clip-path: inset(0 0 0 0);
            }
          }

          @keyframes showContent {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
          }

          h3 {
            margin: 0;
          }
          p {
            margin: 0;
            color: #00000070;
          }
        `}
      </style>
    </section>
  )
}

export default CardsAccordeonUsers
