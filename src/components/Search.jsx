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
  const [page,setPage]=React.useState("")
  const [search,setSearch]=React.useState("")
  const handleAxios=(search,page,title)=>{
    axios({method:"get",url:`http://www.omdbapi.com/?apikey=215e4f09&s=${search}&page=${page}`})
    .then(res=>{
      console.log(res)
      setData(res.data.Search)      
    })
    .catch(err=>alert(err))
    }
  const handleChange=(e)=>{
    if(e.target.change!==""){
      handleAxios(e.target.value)
      setSearch(e.target.value)
    }
  }
  React.useEffect(()=>{
      console.log("executed")
      if(data==""){
        handleAxios("Harry Potter")
      }
  })
  const handlePrevious=()=>{
    let pre=Number(page)-1
    setPage(pre)
    console.log(pre)
    handleAxios(search,pre)
  }
  const handleNext=()=>{
    let nxt=Number(page)+1
    setPage(nxt)
    console.log(nxt)
    handleAxios(search,nxt)
  }
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
      <Grid container justify="center">
        <Button onClick={handlePrevious} color="primary" variant="contained">Prev</Button>
        &nbsp; &nbsp; &nbsp;
        <Button onClick={handleNext} color="secondary" variant="contained">Next</Button>
      </Grid>
    </React.Fragment>
  );
}