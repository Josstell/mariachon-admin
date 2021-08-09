import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const SelectMariachi = ({
  classes,
  mariachiId,
  allMariachis,
  hanldleChangeMariachiId,
}) => {
  return (
    <>
      <InputLabel>Elige un Grupo</InputLabel>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-error-label">Mariachi</InputLabel>
        <Select
          id="mariachi"
          name="mariachiId"
          label="Mariachi"
          value={mariachiId}
          onChange={hanldleChangeMariachiId}
          fullWidth
        >
          <MenuItem value="">
            <em> </em>
          </MenuItem>
          {allMariachis &&
            allMariachis?.map((mariachi) => (
              <MenuItem key={mariachi.mariachiId} value={mariachi.mariachiId}>
                {mariachi.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  )
}

export default SelectMariachi
