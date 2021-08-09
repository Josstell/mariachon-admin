import React from 'react'
import { TrashImage } from '@components/Logo/index'
import { useSelector } from 'react-redux'

const ImagesRow = ({
  title,
  isLargeRow = false,
  videos,
  handleDeleteVideo,
}) => {
  const { videosFromDrive } = useSelector((state) => state.addMariachiDataLocal)
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {videosFromDrive?.map(
          (item, index) =>
            ((isLargeRow && item) || (!isLargeRow && item)) && (
              <div className="sectionItem" key={index}>
                <iframe src={item.url} width="213" height="160"></iframe>
                <TrashImage
                  style={{ width: 20, marginTop: 5, cursor: 'pointer' }}
                  onClick={(e) => handleDeleteVideo(e, index)}
                />
              </div>
            )
        )}
      </div>
      <style jsx>{`
        .sectionItem {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
        }
      `}</style>
    </div>
  )
}

export default ImagesRow
