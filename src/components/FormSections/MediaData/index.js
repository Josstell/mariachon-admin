import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { AddVideoIcon } from '@components/IconsSvg'

import TextField from '@material-ui/core/TextField'

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import ImagesRow from '@components/Media/ImagesRow'
import VideosRow from '@components/Media/VideosRow'

import {
  addImagesFromDrive,
  addVideosFromDrive,
} from '@redux/mariachi/mariachi.actions'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))

const MediaData = () => {
  const classes = useStyles()
  const { imagesFromDrive, videosFromDrive } = useSelector(
    (state) => state.addMariachiDataLocal
  )
  const dispatch = useDispatch()

  const [image, setImage] = useState({ url: '', name: '' })

  const [video, setVideo] = useState({
    url: '',
    title: '',
    description: '',
    author: '',
    genre: '',
    license: '',
    location: '',
  })

  const handleImageData = (e) => {
    e.preventDefault()
    setImage({
      ...image,
      [e.target.name]: e.target.value,
    })
  }

  const handleVideoData = (e) => {
    e.preventDefault()
    setVideo({
      ...video,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddImage = (e) => {
    e.preventDefault()

    const IdImage = image.url.split('/')[5]

    const imagesThum = []

    const images = [
      ...imagesFromDrive.images,
      {
        url: `https://drive.google.com/uc?id=${IdImage}`,
        name: image.name,
      },
    ]

    dispatch(addImagesFromDrive({ images, imagesThum }))
    setImage({ url: '', name: '' })
  }

  const handleDeleteImage = (e, index) => {
    e.preventDefault()
    const imagesThum = []

    const images = imagesFromDrive.images.filter((im, ind) => ind !== index)

    dispatch(addImagesFromDrive({ images, imagesThum }))
  }

  const handleAddVideo = (e) => {
    e.preventDefault()
    console.log('url', video)
    const IdVideo = video.url.split('/')[5]
    console.log('url', IdVideo)

    const videos = [
      ...videosFromDrive,
      {
        url: `https://drive.google.com/file/d/${IdVideo}/preview`,
        title: video.title,
        description: video.description,
        author: video.author,
        genre: video.genre,
        license: video.license,
        location: video.location,
      },
    ]

    dispatch(addVideosFromDrive(videos))

    setVideo({
      url: '',
      title: '',
      description: '',
      author: '',
      genre: '',
      license: '',
      location: '',
    })
  }

  const handleDeleteVideo = (e, index) => {
    e.preventDefault()
    const videos = videosFromDrive.filter((vi, ind) => ind !== index)
    dispatch(addVideosFromDrive(videos))
  }

  return (
    <div className="collapse-content">
      <div className="collapse" id="element-one">
        <a className="element-one" href="#element-one">
          <i className="fab fa-instagram"></i> Imagenes
        </a>
        <div className="content">
          <div className="inner-content">
            {/** */}
            <div className={classes.root}>
              <TextField
                id="standard-full-width"
                label="Agregar foto"
                style={{ margin: 8 }}
                placeholder="url de la foto"
                fullWidth
                margin="normal"
                value={image.url}
                name="url"
                onChange={handleImageData}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="standard-full-width"
                label="Nombre"
                style={{ margin: 8 }}
                placeholder="Nombre ó breve descripción de la foto."
                fullWidth
                margin="normal"
                value={image.name}
                name="name"
                onChange={handleImageData}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div
                style={{
                  marginTop: 10,
                  position: 'relative',
                  right: '-90%',
                  cursor: 'pointer',
                }}
              >
                <AddAPhotoIcon onClick={handleAddImage} />
              </div>
              <ImagesRow
                title="Imagenes Mariachi 2000"
                handleDeleteImage={handleDeleteImage}
                trash={'visible'}
              />
            </div>

            {/** */}
          </div>
        </div>
      </div>
      <div className="collapse" id="element-two">
        <a className="element-two" href="#element-two">
          <i className="fab fa-twitter"></i> Videos
        </a>
        <div className="content">
          <div className="inner-content">
            {/** */}
            <div className={classes.root}>
              <TextField
                id="standard-full-width"
                label="Agregar video"
                style={{ margin: 8 }}
                placeholder="url del video"
                fullWidth
                margin="normal"
                name="url"
                value={video.url}
                onChange={handleVideoData}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="standard-full-width"
                label="Titulo del video"
                style={{ margin: 8 }}
                placeholder="Titulo del video"
                fullWidth
                margin="normal"
                name="title"
                value={video.title}
                onChange={handleVideoData}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="standard-full-width"
                label="Descripción"
                style={{ margin: 8 }}
                placeholder="Breve desripción"
                fullWidth
                margin="normal"
                name="description"
                value={video.description}
                onChange={handleVideoData}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="standard-full-width"
                label="Nombre de los compositores"
                style={{ margin: 8 }}
                placeholder="Compositores"
                fullWidth
                margin="normal"
                name="author"
                value={video.author}
                onChange={handleVideoData}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="standard-full-width"
                label="Genero"
                style={{ margin: 8 }}
                placeholder="Genero de la canción"
                fullWidth
                margin="normal"
                name="genre"
                value={video.genre}
                onChange={handleVideoData}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="standard-full-width"
                label="Locación"
                style={{ margin: 8 }}
                placeholder="Lugar de la toma del video"
                fullWidth
                margin="normal"
                name="location"
                value={video.location}
                onChange={handleVideoData}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="standard-full-width"
                label="Permisos"
                style={{ margin: 8 }}
                placeholder="Permisos "
                fullWidth
                margin="normal"
                name="license"
                value={video.license}
                onChange={handleVideoData}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <div
                style={{
                  width: '25px',
                  marginTop: 10,
                  position: 'relative',
                  right: '-88%',
                  cursor: 'pointer',
                }}
              >
                <AddVideoIcon
                  style={{ width: '100%' }}
                  onClick={handleAddVideo}
                />
              </div>
              <VideosRow
                title="Videos Mariachi 2000"
                handleDeleteVideo={handleDeleteVideo}
              />
            </div>
            {/** */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaData
