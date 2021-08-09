import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import CarruselImages from '@components/CarruselImages'
import CarruselVideos from '@components/CarrouselVideos'
import {
  addImagesFromDrive,
  addVideosFromYouTube,
} from '@redux/mariachi/mariachi.actions'

const ModalImgVid = ({ classes, open, setOpen, option }) => {
  const [images, setImages] = useState([])
  const [image, setImage] = useState('')

  const [videos, setVideos] = useState([])
  const [video, setVideo] = useState()

  const dispatch = useDispatch()

  // useEffect(() => {
  //   setImages(addImagesOrVideos.imagesFromDrive)
  //   setVideos(addImagesOrVideos.videosFromYouTube)
  // }, [])

  const handleAddImage = (e) => {
    e.preventDefault()
    const IdImage = image.split('/')[5]
    setImages([...images, `https://drive.google.com/uc?id=${IdImage}`])
    setImage('')
  }

  const handleDeleteImage = (e, index) => {
    e.preventDefault()
    setImages(images.filter((im, ind) => ind !== index))
  }

  const handleAddVideo = (e) => {
    e.preventDefault()
    const IdVideo = video.split('=')[1]
    setVideos([...videos, `https://www.youtube.com/embed/${IdVideo}`])
    setVideo('')
  }

  const handleDeleteVideo = (e, index) => {
    e.preventDefault()
    setVideos(videos.filter((vi, ind) => ind !== index))
  }

  const handleClose = (e) => {
    e.preventDefault()

    if (option === 'images') {
      dispatch(addImagesFromDrive(images))
    } else if (option === 'videos') {
      dispatch(addVideosFromYouTube(videos))
    }

    setOpen(false)
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div>
              <h3>Agregar {option}</h3>
              <form type="submit">
                <div className="form-login">
                  {option === 'images' && (
                    <div>
                      <label htmlFor="images">Imagenes</label>
                      <input
                        id="images"
                        className="form-input"
                        placeholder="Agregar enlace de una imagen"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                      />
                      <button className="form-button" onClick={handleAddImage}>
                        Agregar imagenes
                      </button>
                      <CarruselImages
                        images={images}
                        handleDeleteImage={handleDeleteImage}
                      />
                      {/* {images &&
                        images.map((image, index) => (
                          <div key={index}>
                            <img
                              src={image}
                              alt={index}
                              style={{ width: 100, height: 70 }}
                            />
                            <button
                              onClick={(e) => handleDeleteImage(e, image)}
                            >
                              Borrar Image
                            </button>
                          </div>
                        ))} */}
                    </div>
                  )}
                  {option === 'videos' && (
                    <div>
                      <label htmlFor="videos">Videos</label>
                      <input
                        id="videos"
                        className="form-input"
                        placeholder="Agregar enlace de un video"
                        value={video}
                        onChange={(e) => setVideo(e.target.value)}
                      />
                      <button className="form-button" onClick={handleAddVideo}>
                        Agregar Videos
                      </button>
                      <CarruselVideos
                        videos={videos}
                        handleDeleteVideo={handleDeleteVideo}
                      />
                      {/* {videos &&
                        videos.map((video, index) => (
                          <div key={index}>
                            <iframe
                              width="280"
                              height="157"
                              src={video}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />

                            <button
                              onClick={(e) => handleDeleteVideo(e, video)}
                            >
                              Borrar Video
                            </button>
                          </div>
                        ))} */}
                    </div>
                  )}
                  <div>
                    <button className="form-button" onClick={handleClose}>
                      Guardar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
      <style jsx>{`
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
      `}</style>
    </div>
  )
}

export default ModalImgVid
