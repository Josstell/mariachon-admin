import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import DeleteIcon from '@material-ui/icons/Delete'

const CarruselVideos = ({ videos, handleDeleteVideo }) => {
  const onChange = () => {}
  const onClickItem = () => {}
  const onClickThumb = () => {}

  return (
    <Carousel
      showArrows={true}
      showThumbs={false}
      onChange={onChange}
      onClickItem={onClickItem}
      onClickThumb={onClickThumb}
    >
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <div key={index}>
            <div>
              <iframe
                width="280"
                height="157"
                src={video}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div
              style={{
                marginTop: '-20px',
                position: 'absolute',
                right: '4vh',
              }}
            >
              <DeleteIcon
                onClick={(e) => handleDeleteVideo(e, index)}
                style={{ color: '#000', fontSize: '20px', cursor: 'pointer' }}
              />
            </div>
          </div>
        ))
      ) : (
        <div>
          <img src={'/no_video_available.jpeg'} style={{ width: '100px' }} />
        </div>
      )}
    </Carousel>
  )
}

export default CarruselVideos
