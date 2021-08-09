import React from 'react'
import { TrashImage } from '@components/Logo/index'
import { useSelector } from 'react-redux'

const ImagesRow = ({ title, isLargeRow = false, handleDeleteImage, trash }) => {
  const { imagesFromDrive } = useSelector((state) => state.addMariachiDataLocal)
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {imagesFromDrive.images?.map(
          (item, index) =>
            ((isLargeRow && item) || (!isLargeRow && item)) && (
              <div className="sectionImage" key={index}>
                <img
                  className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                  src={item.url}
                  alt={item.name}
                />
                <TrashImage
                  style={{
                    width: 20,
                    marginTop: 5,
                    cursor: 'pointer',
                    visibility: trash,
                  }}
                  onClick={(e) => handleDeleteImage(e, index)}
                />
              </div>
            )
        )}
      </div>
      <style jsx>{`
        .sectionImage {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  )
}

export default ImagesRow
