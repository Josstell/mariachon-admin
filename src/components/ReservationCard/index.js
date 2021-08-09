/* eslint-disable camelcase */
import { useRouter } from 'next/router'

const ReservationCard = ({ reservation }) => {
  const router = useRouter()

  const {
    mariachiData: { image_logo, nameMariachi },
    client: { nameClient },
    price,
    service,
    reservationId,
    date,
  } = reservation

  return (
    <div className="reservation" key={reservationId}>
      <div>
        <img src={image_logo} alt="logo" />
        {/* <input type="file" id="imageInputMariachi" hidden="hidden" onChange={handleImageChange} />
                <span><EditIcon onClick={handleImagePicture} style={{ color: "#000", fontSize: "12px" }} /> </span> */}
        <p>{nameMariachi}</p>
        {/* <p>Coordinador: {coordinator}</p> */}
      </div>
      <div className="reservation_info">
        <p>
          Reservación:
          {reservationId}
        </p>
        <p>
          Cliente:
          {nameClient}
        </p>
        <p>
          Fecha y hora:
          {date}
        </p>
        <p>
          Servicio:
          {service}
        </p>
        <p>
          Precio:
          {price}
        </p>
        <p>Estado: pendiente a enviar</p>
      </div>
      <div>
        <button
          onClick={() =>
            router.push(`/edit/reservation/${reservationId}?admin=useredit`)
          }
        >
          Editar
        </button>
      </div>
      {/* <form>
                <p>Selecciona Servicio:</p>
                <input type="radio" id="Serenata" name="service" value={service_price.Serenata} />
                <label for="service1">{service[0]} - {service_price.Serenata}</label><br />
                <input type="radio" id="age2" name="service" value={service_price.Hora} />
                <label for="service2">{service[1]} - {service_price.Hora}</label><br />

                <input type="submit" value="Crear reservacion" onClick={handleSubmit} />
            </form> */}
      <style jsx>
        {`
          .reservation {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            margin: 10px;
            padding: 20px;
            width: 100%;
            min-width: 80px;
            background-color: whitesmoke;
            border-radius: 20px;
            z-index: 1;
          }
          .reservation > div > img {
            max-height: 180px;
            width: 93px;
            object-fit: contain;
            margin-bottom: 15px;
            border-radius: 10%;
          }
          .reservation > button {
            background: #f0c14b;
            border: 1px solid;
            margin-top: 10px;
            border-color: #a88734 #9c7e31 #846a29;
            color: #111;
          }
          .reservation_price {
            margin-top: 5px;
          }
          .reservation_info {
            margin-bottom: 15px;
          }
        `}
      </style>
    </div>
  )
}

export default ReservationCard
