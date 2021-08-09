/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import { deepPurple } from '@material-ui/core/colors'

import { SelectPerson, EditPerson } from '@components/IconsSvg/index'

const urlImage =
  'https://firebasestorage.googleapis.com/v0/b/mariachonauth-prod.appspot.com/o/no-image.png?alt=media'

const useStyles = makeStyles((theme) => ({
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}))

const CardsSelectClient = ({ searchACMC, byName, setClientExistent }) => {
  const classes = useStyles()

  const router = useRouter()
  const allUsers = useSelector((state) => state.allUsers)

  const [users, setUsers] = useState(allUsers)

  useEffect(() => {
    let usersSearhched = allUsers

    switch (searchACMC) {
      case 2:
        usersSearhched = allUsers.filter(
          (user) => user.role === 'client' || user.role === 'clientNotEmail'
        )
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
    }

    setUsers(usersSearhched)
  }, [searchACMC, byName])

  const handleAddClient = (id) => {
    const clientExistent = users.find((user) => user.userId === id)
    setClientExistent(clientExistent)
  }

  return (
    <section>
      {users &&
        users.map((user) => (
          <details key={user.userId}>
            <summary>
              <div className="user-card">
                <div className="user-card-image">
                  {user.imageUrl === urlImage ? (
                    <Avatar className={classes.purple}>
                      {user.fullName.charAt(0)}
                    </Avatar>
                  ) : (
                    <Avatar alt={user.fullName} src={user.imageUrl} />
                  )}
                </div>
                <div>
                  <span>{user.fullName}</span>
                </div>
                <div className="user-card-arrow-down">
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    style={{ fontSize: '2vh' }}
                  />
                </div>
              </div>
            </summary>
            <div className="card-userdetails">
              <div className="card-userdetails-image">
                {user.imageUrl === urlImage ? (
                  <Avatar className={classes.purple}>
                    {user.fullName.charAt(0)}
                  </Avatar>
                ) : (
                  <Avatar alt={user.fullName} src={user.imageUrl} />
                )}
                <p>{user.userName}</p>
              </div>
              <div>
                <ul>
                  <li>{user.phone}</li>
                  <li>{user.email}</li>
                  {(user.role === 'mariachi' ||
                    user.role === 'coordinator') && <li>{user.instrument}</li>}
                  <li>{user.enable === true ? 'activo' : 'no activo'}</li>
                </ul>
              </div>
            </div>

            <div className="card-buttons">
              <EditPerson
                onClick={() =>
                  router.push(`/edit/user/${user.userId}?admin=useredit`)
                }
                style={{ width: 25, cursor: 'pointer' }}
              />
              <SelectPerson
                onClick={() => handleAddClient(user.userId)}
                style={{ width: 25, cursor: 'pointer', marginLeft: 5 }}
              />
            </div>
          </details>
        ))}

      <style jsx>
        {`
          @import url('https://fonts.googleapis.com/css?family=Karla|Space+Mono');

          .card-buttons {
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }
          .user-card {
            display: flex;
            flex-direction: row;
            justify-content: start;
            align-items: center;
            position: relative;
          }
          .user-card-image {
            margin-right: 1vh;
          }
          .user-card-arrow-down {
            display: block;
            position: absolute;
            right: 5px;
          }

          .card-userdetails {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            width: 100%;
          }
          .card-userdetails-image {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          section {
            max-width: var(--sectionWidth);
            margin: 40px auto;
            width: 100%;
            color: #000;
          }

          summary {
            display: block;
            cursor: pointer;
            padding: 5px;
            font-family: 'Space Mono', monospace;
            font-size: 16px;
            transition: 0.3s;
            user-select: none;
          }

          details {
            margin-bottom: 1vh;
            border: rgba(0, 0, 0, 0.4) solid 0px;
            border-radius: 20px;
            background: rgba(220, 220, 220, 0.5);
          }
          details > div {
            display: flex;
            flex-wrap: wrap;
            overflow: auto;
            height: 100%;
            user-select: none;
            padding: 0 10px;
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
        `}
      </style>
    </section>
  )
}

export default CardsSelectClient
