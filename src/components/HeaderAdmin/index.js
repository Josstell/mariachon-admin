import Link from 'next/link'

import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { LogoMariachonv2 } from '@components/Logo/'

const HeaderAdmin = () => (
  <div className="admin-header">
    <div>
      <Link href="/">
        <span>
          <LogoMariachonv2
            width={180}
            height={60}
            color1="#000"
            color2="#000"
          />
        </span>
      </Link>
    </div>
    <div className="menu-reports-social-media">
      <div className="reports-social-media">
        <a>facebook</a>
      </div>
      <div className="reports-social-media">
        <a>youtube</a>
      </div>
      <div className="reports-social-media">
        <a>instagram</a>
      </div>
      <div className="reports-social-media">
        <a>Reportes</a>{' '}
      </div>
      <div className="reports-social-media">
        <a>Mensajes (1)</a>{' '}
      </div>
    </div>
    <div>
      <FontAwesomeIcon icon={faBell} style={{ fontSize: '3vh' }} />
      <span> (1)</span>
    </div>
    <style jsx>
      {`
        .admin-header {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 3vh;
        }
        .menu-reports-social-media {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }
        .reports-social-media {
          margin: 2vh;
        }
        .reports-social-media > a {
          color: #111;
          font-weight: 500;
        }
      `}
    </style>
  </div>
)

export default HeaderAdmin
