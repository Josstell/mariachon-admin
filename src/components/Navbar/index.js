import React from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { LogoMariachon } from '@components/Logo'

// import SearchIcon from '@material-ui/icons/Search'
import { Link } from '@material-ui/core'
import { logoutUser } from '@redux/users/users.actions'

const Navbar = () => {
  const router = useRouter()
  const users = useSelector((state) => state.users)
  const { credentials } = users

  console.log(credentials)

  const dispatch = useDispatch()

  const handlerLogout = () => {
    dispatch(logoutUser())
  }

  const handlerSignin = () => {
    router.push('/login')
  }

  const handlerSignup = (userRole) => {
    router.push({
      pathname: '/signup',
      query: { role: userRole },
    })
  }

  return (
    <div className="header-container">
      <div className="item item-logo">
        <Link href="/">
          <LogoMariachon width={180} height={60} color1="#fff" color2="#fff" />
        </Link>
      </div>

      <div className="item header-services">
        <div className=" item-serenata">
          <button className="button">Serenatas</button>
        </div>
        <div className="item item-x_hora">
          <button className="button">Servicio por hora</button>
        </div>
      </div>

      <div className="item header-register">
        <div className="item item-mariachi">
          <a onClick={() => handlerSignup('client')}>registrar</a>
        </div>

        <div className="item item_cliente">
          {credentials.userName ? (
            <a onClick={handlerLogout}>{credentials.userName}</a>
          ) : (
            <a onClick={handlerSignin}>Login</a>
          )}
        </div>
      </div>
      {/* <div className={styles.grid_item_search}>
        <div className={styles.subitem_location}>
          <p>Ubicación de su evento - preview</p>
        </div>
        <div className={styles.subitem_date}>
          <div className={styles.vl} />
          <p>Fecha y hora</p>
        </div>

        <div className={styles.subitem_icon}>
          <SearchIcon />
        </div>
      </div> */}
      <style jsx>{`
        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100vw;
          background: rgba(3, 4, 46, 0.899);
        }
        .button {
          border: transparent;
          background: transparent;
          width: auto;
          height: 4vh;
          padding-left: 3vw;
          font-weight: normal;
          font-size: 1.5vw;
          color: rgb(218, 215, 215);
        }
        .item {
          flex-grow: 1;
          flex-shrink: 1;
        }
        .item > a {
          font-size: 1.5vw;
          margin: 0;
          padding: 0;
        }

        .header-services {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-around;
        }
        .header-register {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-around;
        }
      `}</style>
    </div>
  )
}

export default Navbar
