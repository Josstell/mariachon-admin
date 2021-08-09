import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import MariachiCard from '@components/MariachiCard'
import SearchInput from '@components/FormSections/SearchInput'
import ReservasSearchButton from '@components/Search/ReservasSearchButton'
import { AddReservationIcon } from '@components/IconsSvg'

const MariachisAdmin = () => {
  const router = useRouter()
  const allMariachis = useSelector((state) => state.allMariachis)

  const [searchACMC, setSearchACMC] = useState(0)
  const [byName, setByName] = useState('')

  const handleButtons = (name) => {
    setSearchACMC(name)
    setByName('')
  }

  const [mariachis, setMariachis] = useState(allMariachis)

  useEffect(() => {
    let mariachisSearhched = allMariachis

    switch (searchACMC) {
      case 1:
        if (byName !== '') {
          mariachisSearhched = mariachisSearhched.filter(
            (mariachis) =>
              mariachis.coordinatorData
                .toLowerCase()
                .indexOf(byName.toLowerCase()) !== -1
          )
        }

        break
      case 2:
        if (byName !== '') {
          mariachisSearhched = mariachisSearhched.filter(
            (mariachis) =>
              mariachis.coordinatorData.nameMariachi
                .toLowerCase()
                .indexOf(byName.toLowerCase()) !== -1
          )
        }
        break
      case 3:
        if (byName !== '') {
          mariachisSearhched = mariachisSearhched.filter(
            (mariachis) =>
              mariachis.client.service_price.Hora.toLowerCase().indexOf(
                byName.toLowerCase()
              ) !== -1
          )
        }
        break

      default:
        if (byName !== '') {
          mariachisSearhched = mariachisSearhched.filter(
            (mariachis) =>
              mariachis.name.toLowerCase().indexOf(byName.toLowerCase()) !== -1
          )
        }
        break
    }

    setMariachis(mariachisSearhched)
  }, [searchACMC, byName])

  const keyWords = {
    mariachi: 'mariachi',
    coordinator: 'coordinador',
    members: 'miembros',
    state: 'estado',
  }

  return (
    <div className="mariachi-container">
      <SearchInput
        searchACMC={searchACMC}
        keyWords={keyWords}
        setByName={setByName}
      />
      <div className="mariachi-details-buttons-search">
        <div className="mariachi-details-buttons">
          <ReservasSearchButton
            handleButtons={handleButtons}
            buttonsEnabled={keyWords}
          />
          <div
            className="mariachi-button-add"
            onClick={() => router.push('/create/mariachi?admin=useredit')}
          >
            <div style={{ marginTop: 10 }}>
              <AddReservationIcon style={{ width: 25 }} />
            </div>
            <p>Nuevo mariachi</p>
          </div>
        </div>
      </div>

      <div className="container-mariachi-cards">
        {mariachis?.map((mariachi) => (
          <MariachiCard
            key={mariachi.mariachiId}
            mariachiId={mariachi.mariachiId}
            name={mariachi.name}
            coordinatorId={mariachi.coordinatorId}
            coordinator={mariachi.coordinatorData}
            service_price={mariachi.service_price}
            image={mariachi.imageLogo}
          />
        ))}
      </div>

      <style jsx>
        {`
          .mariachi-details-buttons-search {
            display: flex;
            flex-direction: column;
          }
          .mariachi-details-buttons {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
          }
          .mariachi-button-add {
            display: flex;
            flex: 1;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: auto;
            min-width: 150px;
            padding-top: 0.8vh;
            padding-bottom: 0.8vh;
            background-color: rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
            -webkit-backdrop-filter: blur(10px);
            cursor: pointer;
          }
          .mariachi-button-add :hover {
            background-color: rgba(49, 58, 166, 0.2);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
          }

          .mariachi-container {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;

            margin: 1vh 8vh;
          }

          .container-mariachi-cards {
            margin-top: 2vh;
            margin-left: 5vh;
            margin-right: 5vh;

            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
          }

          p {
            font-size: 10px;
            margin-top: -5px;
          }
        `}
      </style>
    </div>
  )
}

export default MariachisAdmin
