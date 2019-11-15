import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Display from './Display'
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios'
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid'

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
  const handleAxios=(search)=>{
    axios({method:"get",url:`http://www.omdbapi.com/?apikey=215e4f09&s=${search}&page=1`})
    .then(res=>{
      console.log(res)
      setData(res.data.Search)      
    })
    .catch(err=>alert(err))
    }
  const handleChange=(e)=>{
    handleAxios(e.target.value)
  }
  React.useEffect(()=>{
      console.log("executed")
      if(data==""){
        handleAxios("Harry Potter")
      }
  })
  console.log(data,"here")

  return (
    <React.Fragment>
      <Paper component="form" className={classes.root}>
        <InputBase
        onChange={handleChange}
          className={classes.input}
          placeholder="Search For Movies"
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <br/> <br/> <br/> <br/>
      <Grid container>
        {data!==""?(<Display data={data}/>):(null)}
      </Grid>
      <br/> <br/>
      <Button color="primary" variant="contained">Previous</Button>
      &nbsp; &nbsp; &nbsp;
      <Button color="secondary" variant="contained">Next</Button>
    </React.Fragment>
  );
}