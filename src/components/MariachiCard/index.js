// import EditIcon from '@material-ui/icons/Edit';

import { useRouter } from 'next/router'

import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications'

const MariachiCard = ({
  mariachiId,
  name,
  image,
  coordinator,
  coordinatorId,
}) => {
  const router = useRouter()

  return (
    <div className="mariachi-card-container">
      <div className="mariachi-card-image">
        <img src={image} alt="logo" />
      </div>
      <div className="mariachi_info">
        <p>{name} </p>
        <p>
          <strong>Coordinador: </strong>
          {coordinator}
        </p>
        {/* <div className="mariachi_rating">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p key={i}>⭐</p>
                        ))}
                </div> */}
        <SettingsApplicationsIcon
          onClick={() =>
            router.push(`/edit/mariachi/${mariachiId}?admin=useredit`)
          }
          style={{
            color: '#fff',
            marginBottom: 10,
            marginLeft: 210,
            fontSize: '20px',
            cursor: 'pointer',
          }}
        />
      </div>

      <style jsx>
        {`
          .mariachi-card-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            margin: 2vh;
            width: 35vh;
            min-height: 40vh;
            background-color: whitesmoke;
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
            -webkit-backdrop-filter: blur(10px);
            border-radius: 20px;
            z-index: 1;
          }

          .mariachi-card-image {
            width: 100%;
            height: 65%;
            min-height: 45vh;
            background-color: rgba(230, 230, 230, 0.5);
            border-radius: 20px 20px 0 0;
          }
          .mariachi-card-image > img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            margin-bottom: 15px;
            border-radius: 20px 20px 0 0;
          }
          .mariachi > button {
            background: #f0c14b;
            border: 1px solid;
            margin-top: 10px;
            border-color: #a88734 #9c7e31 #846a29;
            color: #111;
          }
          .mariachi_price {
            margin-top: 5px;
          }
          .mariachi_info {
            height: 35%;
            width: 100%;
            background-color: #34241e;
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            border-radius: 0 0 20px 20px;
          }

          .mariachi_rating {
            display: flex;
          }
          p {
            color: #fff;
          }
        `}
      </style>
    </div>
  )
}

export default MariachiCard
