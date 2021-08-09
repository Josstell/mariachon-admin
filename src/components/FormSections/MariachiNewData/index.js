import { MariachiIconGuitar } from '@components/IconsSvg'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

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

const MariachiNewData = ({ mariachiD }) => {
  const classes = useStyles()
  const { nameMariachi, setNameMariachi, description, setDescription } =
    mariachiD

  return (
    <div className="collapse-content">
      <div className="inner-content">
        <div className="mariachi-logo">
          {!mariachiD.imageLogo && (
            <figure>
              <MariachiIconGuitar />
            </figure>
          )}
        </div>
        <div className={classes.root}>
          <TextField
            value={nameMariachi}
            onChange={(e) => setNameMariachi(e.target.value)}
            id="standard-full-width"
            label="Nombre comercial de la agrupación"
            style={{ margin: 8 }}
            placeholder="Mariachi"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="standard-full-width"
            label="Descripción"
            style={{ margin: 8 }}
            placeholder="Descripción del mariachi"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>
      <style jsx>{`
        .mariachi-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 5vh;
          margin-bottom: 5vh;
        }
        .collapse-content > .inner-content > .mariachi-logo > figure {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          /* specify negative margin matching half the height of the element */
          /* position relative for the pseudo element */
          position: relative;
        }

        .collapse-content > .inner-content > .mariachi-logo > figure > img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }

        .collapse-content > .inner-content > .mariachi-logo > figure:before {
          content: '';
          border-radius: inherit;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
          border: 1rem solid hsl(250, 85%, 97%);
          box-shadow: 0 1px hsla(0, 0%, 0%, 0.1);
        }
      `}</style>
    </div>
  )
}

export default MariachiNewData
