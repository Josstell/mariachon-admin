import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded'
import SearchIcon from '@material-ui/icons/Search'

const ButtonSearch = ({ name, searchACMC, handleClick }) => (
  <div>
    <button
      className={
        name !== searchACMC
          ? 'buttonSearch_container_enable'
          : 'buttonSearch-container-disable'
      }
      onClick={() => handleClick(name)}
    >
      {name !== searchACMC ? <SearchIcon /> : <ExpandMoreRoundedIcon />} {name}
    </button>

    <style jsx>
      {`
        .buttonSearch_container_enable {
          text-align: center;
          cursor: pointer; /* Mouse pointer on hover */
          background: rgba(3, 41, 166, 0.78);
        }
        .buttonSearch-container-disable {
          text-align: center;
          cursor: pointer; /* Mouse pointer on hover */
          background: red;
        }
      `}
    </style>
  </div>
)

export default ButtonSearch
