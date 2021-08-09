import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import DeleteIcon from '@material-ui/icons/Delete'

const CarruselImages = ({ images, handleDeleteImage }) => {
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
      {images.length > 0 ? (
        images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={index} style={{ width: 200, height: 140 }} />
            <div
              style={{
                marginTop: '-20px',
                position: 'absolute',
                right: '4vh',
              }}
            >
              <DeleteIcon
                onClick={(e) => handleDeleteImage(e, index)}
                style={{ color: '#000', fontSize: '20px', cursor: 'pointer' }}
              />
            </div>
          </div>
        ))
      ) : (
        <div>
          <img src={'/no_image.png'} style={{ width: '100px' }} />
        </div>
      )}
    </Carousel>
  )
}

export default CarruselImages
