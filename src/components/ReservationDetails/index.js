import { LogoMariachonv2 } from '@components/Logo/'

const ReservationDetails = ({ client, mariachi }) => {
  return (
    <div className="card">
      <div className="card__header">
        <LogoMariachonv2 width={180} height={60} color1="#EEE" color2="#EEE" />
      </div>

      <div className="card__section-name">
        <img
          className="card__avatar"
          src={mariachi.image_logo}
          alt="Logo_mariachi"
        />

        <h4>
          <strong>Reserva: </strong> xxxxx
          <br /> <strong>Cliente: </strong> {client.fullName}
          <br /> <strong>Tel: </strong> {client.phone}
          <br /> <strong>Email: </strong> {client.email}
        </h4>
      </div>

      <div className="card__section-info">
        <div>
          <strong>Mariachi: </strong>
          {mariachi.name}
        </div>
        <div>
          <strong>Fecha: </strong>
        </div>
        <div>
          <strong>Hora: </strong>
          Hora
        </div>
        <div>
          <strong>Dirección: </strong>
          Direccion
        </div>
        {/* <div>
          <strong>Telefono: </strong>
          Telefono
        </div> */}

        <div>
          <strong>Servicio: </strong>
          servicio
        </div>
        <div>
          <strong>Precio: </strong>
          precio
        </div>
        <div>
          <strong>Deposito: </strong>
          Deposito
        </div>
        <div>
          <strong>Resta: </strong>
          Resta
        </div>
        <div>
          <strong>Mensaje: </strong>
          mensage
        </div>
        <div>
          <strong>Lista canciones: </strong>
          Lista de canciones
        </div>
      </div>

      <div className="card__footer">
        <b>Coordinador: </b>
        Coordinador
      </div>
      <style jsx>{`
        .card {
          background: #ffffff;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
          border-radius: 8px 8px 8px 8px;
          overflow: hidden;
          height: auto;
        }

        .card__header {
          padding: 0.5rem 0;
          height: 10vh;
          background: #1b1b25;
          display: flex;
          justify-content: center;
        }

        .card__section-name {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem 0;
        }

        .card__section-info {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
          padding: 2rem 2rem;
          background: #f4f4f7;
        }

        .card__avatar {
          border-radius: 10%;
          margin-right: 1rem;
          background: #a3a3a325;
          width: 100px;
          height: 80px;
        }

        .card__footer {
          height: 15vh;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #98ca3f;
          font-weight: bold;
          font-style: italic;
        }
      `}</style>
    </div>
  )
}

export default ReservationDetails
