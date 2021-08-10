import React from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { LogoMariachon } from '@components/Logo'

import SearchIcon from '@material-ui/icons/Search'
import { Link } from '@material-ui/core'
import { logoutUser } from '@redux/users/users.actions'
import styles from './navbar.module.css'

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
    <div className={styles.header_container}>
      <div className={styles.grid_item_logo}>
        <Link href="/">
          <LogoMariachon width={180} height={60} color1="#fff" color2="#fff" />
        </Link>
      </div>

      <div className={styles.grid_item_serenata}>
        <button className={styles.button}>Serenatas</button>
      </div>
      <div className={styles.grid_item_x_hora}>
        <button className={styles.button}>Servicio por hora</button>
      </div>
      <div className={styles.grid_item_premium} />
      <div className={styles.grid_item_economico} />

      <div className={styles.grid_item_mariachi}>
        <a onClick={() => handlerSignup('client')}>registrar</a>
      </div>

      <div className={styles.grid_item_cliente}>
        {credentials.userName ? (
          <a onClick={handlerLogout}>{credentials.userName}</a>
        ) : (
          <a onClick={handlerSignin}>Login</a>
        )}
      </div>

      <div className={styles.grid_item_search}>
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
      </div>

      {/* <div className={styles.header_logo}>
                <div className={styles.header_service}>

                    <LogoMariachon_v4 width={285} height={87} color1={color1} color2={color2} />
                </div>
                <div className={styles.header_service}>
                    <div className={styles.header_serenata}>
                        <h4>Serenatas</h4>
                    </div>
                    <div className={styles.header_time}>
                        <h4>Por hora</h4>
                    </div>
                    <div className={styles.header_price}>
                        <h4>Calidad o precio</h4>

                    </div>
                </div>
            </div>
            <div className={styles.header_search}>
                <div>
                    <h2>Search</h2>
                </div>
                <div>
                    <h2>Search</h2>
                </div>
                <div>
                    <h2>Search</h2>
                </div>
            </div> */}
    </div>
  )
}

export default Navbar
