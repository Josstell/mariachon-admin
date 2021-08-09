import { useRouter } from 'next/router'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import EditIcon from '@material-ui/icons/Edit'

const ReservationCardAll = ({ reservation, handleWhatsApp }) => {
  const router = useRouter()

  const {
    mariachiData: { imageLogo, nameMariachi, coordinator },
    client: { nameClient },
    price,
    service,
    reservationId,
    date,
    address,
    status,
    createdBy,
    qty,
    deposit,
  } = reservation

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const dateTime = new Date(date)

  return (
    <div className="card-all-container">
      <div className="card-all-header">
        <h3>Reservación: {reservationId} </h3>
      </div>
      <div className="card-all-body-external">
        <div className="card-all-body">
          <div className="card-body-header">
            <div className="card-body-img-state">
              <div className="card-body-img">
                <img src={imageLogo} alt={nameMariachi} />
              </div>
              <h8>
                Estado:
                <strong
                  className={
                    status === 'pendiente a enviar'
                      ? 'card-all-status-red'
                      : 'card-all-status-green '
                  }
                >
                  {status}
                </strong>
              </h8>
            </div>
            <div>
              <hr className="solid" />
            </div>
            <h4>{nameMariachi}</h4>
            <h5>
              <strong>Coordinador:</strong> {coordinator}
            </h5>
            <p>
              <strong>Cliente:</strong> {nameClient}
            </p>
            <p>
              <strong>Dirección:</strong> {address}
            </p>
            <p>
              <strong>Fecha:</strong>{' '}
              {dateTime.toLocaleDateString('es-MX', options)}
            </p>
            <p>
              <strong>Hora:</strong> {dateTime.toLocaleTimeString()}
            </p>
            <p>
              <strong>Servicio:</strong> {service} x {qty}
            </p>
            <p>
              <strong>Precio total:</strong> $ {price * qty}
            </p>
            <p>
              <strong>Deposito:</strong> $ {deposit}
            </p>
            <p>
              <strong>Resta a pagar:</strong> $ {price * qty - deposit}
            </p>
            <div className="card-resevations-buttons">
              <div
                onClick={() =>
                  router.push(
                    `/edit/reservation/${reservationId}?admin=useredit`
                  )
                }
              >
                <EditIcon
                  style={{
                    color: '#000',
                    marginTop: '7',
                    fontSize: '27px',
                    cursor: 'pointer',
                    marginRight: '10',
                  }}
                />
              </div>
              <div onClick={() => handleWhatsApp(reservation)}>
                <WhatsAppIcon
                  style={{
                    color: '#000',
                    fontSize: '27px',
                    cursor: 'pointer',
                    marginRight: '10',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-all-footer">
        Creado por: <strong>{createdBy}</strong>
      </div>
      <style jsx>{`
        .card-resevations-buttons {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        .card-all-container {
          display: flex;
          flex-direction: column;
          width: 380px;
          height: 560px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 2vh;
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
          -webkit-backdrop-filter: blur(10px);
        }
        .card-all-header {
          height: 10%;
        }
        .card-all-body-external {
          height: 80%;
          border-radius: 20px;
          margin: 0 7% 0 7%;
          background-color: rgba(225, 229, 231, 0.5);
        }
        .card-all-body {
          height: 88%;
          border-radius: 20px;
          margin: 7% 7% 7% 7%;
          padding-top: 7%;
          background-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
          -webkit-backdrop-filter: blur(10px);
        }
        .card-all-footer {
          height: 10%;
          padding-top: 3%;
        }
        .card-body-header {
          display: flex;
          flex-direction: column;
        }
        .card-body-img-state {
          display: flex;
          flex: 1;
          justify-content: space-around;
          align-items: center;
        }
        .card-body-img {
          width: 80px;
          height: 80px;
          display: block;
          z-index: 1;
          background-color: rgba(240, 240, 240, 0.8);
          border-radius: 50%;
        }
        img {
          display: block;
          max-width: 100%;
          height: 90%;
          margin-left: auto;
          margin-right: auto;
          border-radius: 50%;
        }

        h3 {
          font-size: 15px;
        }
        .card-all-status-red {
          color: red;
        }
        .card-all-status-green {
          color: green;
        }

        h8 {
          margin-top: -18%;
          width: 35%;
          font-size: 12px;
        }

        hr.solid {
          margin-top: -15%;
          border-top: 1px solid #bbb;
        }
        h4 {
          color: rgba(140, 140, 140);
          text-align: left;
          margin-left: 2vh;
          margin-right: 2vh;
          font-size: 16px;
        }
        h5 {
          margin-top: -15px;
          text-align: left;
          margin-left: 2vh;
          margin-right: 2vh;
          font-size: 15px;
        }

        p {
          margin-top: -10px;
          text-align: left;
          margin-left: 2vh;
          margin-right: 2vh;
          font-size: 13px;
        }
      `}</style>
    </div>
  )
}

export default ReservationCardAll
