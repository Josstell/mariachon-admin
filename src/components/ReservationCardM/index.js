import { LogoMariachonv2 } from '@components/Logo/'
import Divider from '@material-ui/core/Divider'

const ReservationCardM = ({
  mariachiData,
  reservation,
  dateTime,
  clientData,
  price,
  playlist,
}) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const date = new Date(dateTime)
  return (
    <div className="card">
      <div className="card__header">
        <LogoMariachonv2 width={180} height={60} color1="#EEE" color2="#EEE" />
      </div>
      <div>
        <h4>Reservación: {reservation?.reservationId}</h4>
      </div>
      <Divider />
      <div className="card_header_img_client">
        <div className="card_img">
          <img src={mariachiData?.imageLogo} alt={mariachiData?.nameMariachi} />
        </div>
        <div className="card_header_client">
          <p>
            <strong>Cliente:</strong> {clientData?.fullName}
          </p>
          <p>
            <strong>Telefono:</strong> {clientData?.phone}
          </p>
          <p>
            <strong>Email:</strong> {clientData?.email}
          </p>
        </div>
      </div>
      <Divider />
      <div className="card-data-reservation">
        <p>
          <strong>Mariachi:</strong> {mariachiData?.name}
        </p>
        <p>
          <strong>Dirección:</strong> {reservation.address}
        </p>
        <p>
          <strong>Fecha:</strong> {date.toLocaleDateString('es-MX', options)}
        </p>
        <p>
          <strong>Servicio:</strong> {reservation.qty}{' '}
          {reservation.qty === 1
            ? reservation.service
            : `${
                reservation.service === undefined ? '' : reservation.service
              }s`}
        </p>
        <p>
          <strong>Hora:</strong> {date.toLocaleTimeString()}
        </p>
        <div className="card-divider">
          <Divider />
        </div>
        <p>
          <strong>Tipo de pago:</strong> {reservation.payment}
        </p>
        <p>
          <strong>Precio:</strong> ${price} x {reservation.qty}
        </p>
        <p>
          <strong>Total:</strong> ${price * reservation.qty}
        </p>
        <p>
          <strong>Deposito:</strong> ${reservation.deposit}
        </p>
        <p>
          <strong>Resta a pagar:</strong> $
          {price * reservation.qty - reservation.deposit}
        </p>
        <div className="card-divider">
          <Divider />
        </div>
        <p>
          <strong>Mensaje:</strong> {reservation.message}
        </p>
        <p>
          <strong>Lista de canciones:</strong>
        </p>
        <ol>
          {playlist &&
            playlist.map((play, index) => <li key={index}>{play}</li>)}
        </ol>
      </div>

      <div>
        <div className="card-divider">
          <Divider />
        </div>
        <p>
          <strong>Estado:</strong> {reservation.status}
        </p>
        <h4>
          Coordinador:{' '}
          {mariachiData?.coordinatorUserName
            ? mariachiData?.coordinatorUserName
            : mariachiData?.coordinatorData}
        </h4>
      </div>
      <style jsx>
        {`
          img {
            width: 144px;
            height: 75px;
            border-radius: 10px;
          }
          .card_img {
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
          }
          .card {
            width: 100%;
            height: auto;
            padding: 2rem;
            border-radius: 1rem;
            /* other styles */
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
            -webkit-backdrop-filter: blur(10px);
          }

          .card__header {
            padding: 0rem 0;
            height: 8vh;
            background: rgba(100, 100, 100, 0.1);
            border-radius: 1rem;
            justify-content: center;
          }

          .card-title {
            margin-top: 0;
            margin-bottom: 0.5rem;
            font-size: 1.2rem;
          }

          .card_header_img_client {
            display: flex;
            justify-content: space-around;
            margin-bottom: 2vh;
            margin-top: 2vh;
          }
          .card_header_client {
            margin-top: 1.5vh;
            padding-left: 1vh;
          }
          .card-data-reservation {
            margin-top: 5vh;
          }
          .card-divider {
            margin-bottom: 2vh;
            margin-top: -1vh;
          }
          p,
          a {
            margin-top: -10px;
            font-size: 0.9rem;
            text-align: left;
          }

          a {
            color: #4d4ae8;
            text-decoration: none;
          }
          ol {
            margin-top: -10px;
          }
          li {
            font-size: 12px;
            text-align: left;
            margin-left: 5vh;
          }
        `}
      </style>
    </div>
  )
}

export default ReservationCardM
