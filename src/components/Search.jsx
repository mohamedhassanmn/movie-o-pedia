import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Display from './Display'
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios'
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Typography } from '@material-ui/core';
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

export default function Search(props) {
  const classes = useStyles();
  const [data,setData]=React.useState("")
  const [page,setPage]=React.useState(1)
  const [search,setSearch]=React.useState("harry potter")
  const handleAxios=(find,pages)=>{
    localStorage.setItem("page",pages)
    axios({method:"get",url:`https://www.omdbapi.com/?apikey=215e4f09&s=${find}&page=${pages}`})
    .then(res=>{
      // console.log(res)
        setData(res.data.Search)
    })
    .catch(err=>alert(err))
    }
  const handleChange=(e)=>{
    if(e.target.value!==""){
      handleAxios(e.target.value,1)
      setSearch(e.target.value)
      localStorage.setItem("movie",e.target.value)
    }
  }
  const handleKeyPress=(e)=>{
    if(e.which===13){
      e.preventDefault()
      handleAxios(search,page)
    }
  }
  const handleClick=()=>{
    handleAxios(search,page)
  }
  React.useEffect(()=>{
      if(localStorage.getItem("movie")!==null&&data===""){
        setSearch(localStorage.getItem("movie"))
        setPage(localStorage.getItem("page"))
        handleAxios(localStorage.getItem("movie"),localStorage.getItem("page"))
      }else if(data===""){
        handleAxios(search,page)
      }
  },[data, search, page])
  const handlePrevious=()=>{
    let pre=Number(page)-1  
    setPage(pre)
    handleAxios(search,pre)
  }
  const handleNext=()=>{
    let nxt=Number(page)+1
    setPage(nxt)
    handleAxios(search,nxt)
  }
  return (
    <React.Fragment>
      <Grid container justify="center" >
        <Paper component="form" className={classes.root}>
            <Autocomplete
              id="combo-box-demo"
              options={top100Films}
              getOptionLabel={option => option.title}
              style={{ width: 300 }}
              renderInput={params => (
                <InputBase {...params}
                onChange={handleChange} onKeyPress={handleKeyPress} label="Combo box" 
                  className={classes.input} fullWidth
                  placeholder="Search For Movies"
                />
              )}
            />        
          <IconButton onClick={handleClick} className={classes.iconButton} >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>
      <br/> <br/> <br/> <br/>
      
    {/* movie content Grid */}

      <Grid container justify="center" >
        {data!==""?(<Display data={data}/>):(null)}
      </Grid>
      <br/> <br/>

    {/* pagination */}

      <Grid container justify="center" alignItems="center">
       {page>0? (
        <IconButton onClick={handlePrevious} type="submit" className={classes.iconButton} aria-label="search">
            <ArrowBackIosIcon/>
        </IconButton>
        ):(
            (
        <IconButton color="default" type="submit" className={classes.iconButton} aria-label="search">
            <ArrowBackIosIcon/>
        </IconButton>
            )
          )
        }
          &nbsp;&nbsp; &nbsp;&nbsp;
          <Typography variant="body1">
            {page}
          </Typography>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <IconButton onClick={handleNext} type="submit" className={classes.iconButton} aria-label="search">
            <ArrowForwardIosIcon/>
          </IconButton>
      </Grid>
    </React.Fragment>
  );
}
const top100Films = []
