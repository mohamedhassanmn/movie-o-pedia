import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios'
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
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
}));

export default function Search() {
  const classes = useStyles();
  const [data,setData]=React.useState("")
  const [searchFor,setSearchFor]=React.useState("")
  const handleAxios=()=>{
    axios({method:"get",url:"http://www.omdbapi.com/?apikey=215e4f09&t=Game of Thrones&Season=1"})
    .then(res=>console.log(res))
    .catch(err=>alert(err))
    }

  React.useEffect(()=>{
      console.log("executed")
      if(data==""){
        handleAxios()
      }
  })

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search For Movies"
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}