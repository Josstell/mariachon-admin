import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))

export default function SearchInput({
  searchACMC,
  keyWords,
  setByName,
  byName,
}) {
  const classes = useStyles()

  const word = Object.values(keyWords || {})

  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder={`Busqueda por ${word[searchACMC]}`}
        inputProps={{ 'aria-label': 'Busqueda' }}
        onChange={(e) => {
          setByName(e.target.value)
        }}
      />
      <IconButton
        type="button"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon onClick={(e) => e.preventDefault()} />
      </IconButton>
      {/* <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
      >
        <DirectionsIcon /> 
      </IconButton> */}
    </Paper>
  )
}
