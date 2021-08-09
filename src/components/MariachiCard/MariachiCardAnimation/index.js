import LoadingBox from '@components/LoadingBox'
import { useSelector } from 'react-redux'
import { MariachiIconGuitar } from '@components/IconsSvg'

const MariachiCardAnimation = ({
  coordinator,
  mariachiD,
  services,
  select,
}) => {
  //   const article = document.querySelector("article")

  //   // to compute the center of the card retrieve its coordinates and dimensions
  //   const { x, y, width, height } = article.getBoundingClientRect()
  //   const cx = x + width / 2
  //   const cy = y + height / 2

  //   // following the mousemove event compute the distance betwen the cursor and the center of the card
  //   function handleMove(e) {
  //     const { pageX, pageY } = e

  //     // ! consider the relative distance in the [-1, 1] range
  //     const dx = (cx - pageX) / (width / 2)
  //     const dy = (cy - pageY) / (height / 2)

  //     // rotate the card around the x axis, according to the vertical distance, and around the y acis, according to the horizontal gap
  //     this.style.transform = `rotateX(${20 * dy * -1}deg) rotateY(${20 * dx}deg)`
  //   }

  //   // following the mouseout event reset the transform property
  //   function handleOut() {
  //     this.style.transform = "initial"
  //   }

  //   article.addEventListener("mousemove", handleMove)
  //   article.addEventListener("mouseout", handleOut)
  const { imagesFromDrive, videosFromDrive } = useSelector(
    (state) => state.addMariachiDataLocal
  )

  let loadCoordinator = false
  let loadMariachi = false

  if (select === 'NewMariachi') {
    const { loadingCoordinator, loadingNewMariachi } = useSelector(
      (state) => state.NewMariachi
    )
    loadCoordinator = loadingCoordinator
    loadMariachi = loadingNewMariachi
  } else if (select === 'mariachiToEdit') {
    const { loadingCoordinator, loadingNewMariachi } = useSelector(
      (state) => state.mariachiToEdit
    )
    loadCoordinator = loadingCoordinator
    loadMariachi = loadingNewMariachi
  }

  let servicios = []

  if (services && imagesFromDrive && videosFromDrive) {
    servicios = Object.getOwnPropertyNames(services)
  } else {
    return null
  }

  return (
    <div className="card-container">
      <div className="chargin-container">
        {(loadCoordinator || loadMariachi) && <LoadingBox />}
        {loadCoordinator && loadMariachi ? (
          <strong>
            {' '}
            {select === 'NewMariachi' ? 'Cargando' : 'Actualizando'} datos del
            coordinador
          </strong>
        ) : !loadCoordinator && loadMariachi ? (
          <strong>
            {select === 'NewMariachi' ? 'Cargando' : 'Actualizando'} datos de
            Mariachi
          </strong>
        ) : null}
      </div>
      <article>
        <figure>
          {mariachiD.imageLogo ? (
            <img src={mariachiD.imageLogo} alt={mariachiD.nameMariachi} />
          ) : (
            <MariachiIconGuitar />
          )}
        </figure>

        <div className="card-details">
          {coordinator.fullName && (
            <div className="card-section">
              <h4 className="card-section-title">Coordinador</h4>
              <div className="vl-coor"></div>
              <div className="card-details-section">
                <p className="card-details-section-text">
                  {coordinator.fullName}
                </p>
                <p className="card-details-section-text">
                  {coordinator.userName}
                </p>

                <p className="card-details-section-text">{coordinator.phone}</p>
                <p className="card-details-section-text">{coordinator.email}</p>
                <p className="card-details-section-text">
                  {coordinator.instruName?.map((inst) => (
                    <div className="instruments" key={inst}>
                      {inst}{' '}
                    </div>
                  ))}
                </p>
              </div>
            </div>
          )}

          {mariachiD.nameMariachi && (
            <div className="card-section">
              <h4 className="card-section-title">Mariachi</h4>
              <div className="vl-mar"></div>
              <div className="card-details-section">
                <p className="card-details-section-text">
                  <strong>{mariachiD.nameMariachi}</strong>
                </p>
                <p className="card-details-section-text">
                  {mariachiD.description}
                </p>
              </div>
            </div>
          )}

          {(services.serenata || services.contracto || services.hora) && (
            <div className="card-section">
              <h4 className="card-section-title">Servicios</h4>
              <div className="vl-ser"></div>
              <div className="card-details-section">
                {servicios.map((serv, index) => (
                  <p className="card-details-section-text" key={index}>
                    <strong>{serv}</strong> : $ {Object.values(services)[index]}
                  </p>
                ))}
              </div>
            </div>
          )}

          {imagesFromDrive.images?.length > 0 && (
            <div className="card-section">
              <h4 className="card-section-title">Imagenes</h4>
              <div className="vl-ser"></div>
              <div className="card-details-section">
                {imagesFromDrive.images.map((serv, index) => (
                  <p className="card-details-section-text" key={index}>
                    <strong>{index + 1}</strong> : {serv?.name}
                  </p>
                ))}
              </div>
            </div>
          )}

          {videosFromDrive.length > 0 && (
            <div className="card-section">
              <h4 className="card-section-title">Videos</h4>
              <div className="vl-ser"></div>
              <div className="card-details-section">
                {videosFromDrive.map((serv, index) => (
                  <p className="card-details-section-text" key={index}>
                    <strong>{index + 1}</strong> : {serv?.title}
                  </p>
                ))}
              </div>
            </div>
          )}
          <h1>
            {mariachiD.nameMariachi ? mariachiD.nameMariachi : 'Mariachon'}
          </h1>
        </div>
      </article>

      <style jsx>{`
        .card-container {
          margin-top: 11vh;
        }
        .chargin-container {
          margin-bottom: 11vh;
        }
        .vl-coor {
          border-left: 5px solid green;
          height: auto;
        }
        .vl-mar {
          border-left: 5px solid blue;
          height: auto;
        }
        .vl-ser {
          border-left: 5px solid red;
          height: auto;
        }
        .card-details {
          display: flex;
          flex-direction: column;
        }
        .card-section {
          display: flex;
        }
        .card-details-section {
          display: flex;
          flex-direction: column;
          width: 70%;
        }
        .card-details-section-text {
          margin: 0;
          margin-bottom: -8px;

          width: 100%;
        }
        .card-section-title {
          width: 25%;
        }
        .card-images-section {
          width: 30vh;
          margin: 0;
        }
        p {
        }
        .instruments {
          margin-bottom: -15px;
        }
      `}</style>
    </div>
  )
}

export default MariachiCardAnimation
