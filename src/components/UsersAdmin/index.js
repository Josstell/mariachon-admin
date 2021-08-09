import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import CardsAccordeonUsers from '@components/CardsAccordeonUsers'
import { useDispatch, useSelector } from 'react-redux'
import { clearAddNewUser } from '@redux/users/users.actions'
import ModalUser from '@components/ModalUser'
import SearchInput from '@components/FormSections/SearchInput'
import ReservasSearchButton from '@components/Search/ReservasSearchButton'
import { AddReservationIcon } from '@components/IconsSvg'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(255, 255, 255,0.5)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

const UsersAdmin = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const userAddNew = useSelector((state) => state.userAddNew)

  const [byName, setByName] = useState('')

  const [open, setOpen] = useState(false)

  const [searchACMC, setSearchACMC] = useState('allUsers')

  useEffect(() => {
    if (userAddNew === {}) {
      return null
    } else {
      dispatch(clearAddNewUser())
    }
  }, [userAddNew.email])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleButtons = (name) => {
    setSearchACMC(name)
    setByName('')
  }

  const keyWords = {
    todos: 'Id',
    mariachi: 'mariachi',
    cliente: 'cliente',
    coordinator: 'Coordinador',
  }

  return (
    <div className="users-container">
      <SearchInput
        searchACMC={searchACMC}
        keyWords={keyWords}
        setByName={setByName}
      />
      <div className="search-details-buttons-search">
        <div className="search-details-buttons">
          <ReservasSearchButton
            handleButtons={handleButtons}
            buttonsEnabled={keyWords}
          />
          <div className="search-button-add" onClick={handleOpen}>
            <div style={{ marginTop: 10 }}>
              <AddReservationIcon style={{ width: 25 }} />
            </div>
            <p>Nueva usuario</p>
          </div>
        </div>
      </div>

      <div className="cards-section">
        <CardsAccordeonUsers searchACMC={searchACMC} byName={byName} />
      </div>

      <ModalUser classes={classes} open={open} setOpen={setOpen} />

      <style jsx>
        {`
          .cards-section {
            width: 100%;
          }
          .search-details-buttons-search {
            display: flex;
            flex-direction: column;
          }
          .search-details-buttons {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
          }
          .search-button-add {
            display: flex;
            flex: 1;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: auto;
            min-width: 150px;
            padding-top: 0.8vh;
            padding-bottom: 0.8vh;
            background-color: rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
            -webkit-backdrop-filter: blur(10px);
            cursor: pointer;
          }
          .search-button-add :hover {
            background-color: rgba(49, 58, 166, 0.2);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
          }
          .users-container {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            margin: 1vh 8vh;
          }

          p {
            font-size: 10px;
            margin-top: -5px;
          }

          .login-admin {
            background: rgba(255, 255, 255);
            padding: 5vh;
            text-align: center;
            margin: 0px 50px 0px 50px;
            border: rgba(0, 0, 0, 0.3) 1px solid;
            display: flex;
            flex-direction: column;
          }
          .form-login {
            display: flex;
            flex-direction: column;
          }
          .form-input {
            margin-top: 1vh;
            padding: 2vh;
            width: 35vh;
            border: rgba(0, 0, 0, 0.1) 1px solid;
            border-radius: 5px;
          }
          .form-button {
            background: rgba(198, 222, 250);
            margin-top: 5vh;
            padding: 1.5vh;
            border: rgba(0, 0, 0, 0.1) 1px solid;
            width: 35vh;
            border-radius: 5px;
          }

          .form-button:hover {
            cursor: pointer;
            background: rgba(0, 0, 255);
            color: #fff;
          }
        `}
      </style>
    </div>
  )
}

export default UsersAdmin
