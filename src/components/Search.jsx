import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Display from './Display'
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios'
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
  const [page,setPage]=React.useState("")
  const [search,setSearch]=React.useState("harry potter")
  const [type,setType]=React.useState("")
  const[entryMovie,setEntryMovie]=React.useState(true)
  const[entrySeries,setEntrySeries]=React.useState(true)
  const[entryEpisode,setEntryEpisode]=React.useState(true)
  const handleAxios=(search,page,type)=>{
    axios({method:"get",url:`http://www.omdbapi.com/?apikey=215e4f09&s=${search}&page=${page}&t=${type}`})
    .then(res=>{
      console.log(res)
      // if(type!=""||type!==undefined&&res.data.Search!=undefined){
      //   // setData(res.data.Search)  
      //   console.log(res.data.Search.filter(e=>e.type==type))
      //   // setData(res.data.Search.filter(e=>e.type==type))
      // }else{
      //   console.log("iam in da")
        setData(res.data.Search)  
      // }    
    })
    .catch(err=>alert(err))
    }
  const handleChange=(e)=>{
    if(e.target.change!==""){
      handleAxios(e.target.value,page,type)
      setSearch(e.target.value)
    }
  }
  React.useEffect(()=>{
      console.log("executed")
      console.log(data=="")
      if(data==""){
        handleAxios(search)
      }
      if(props.movie&&entryMovie){
        console.log("chacha")
        setType("movie")
        setEntryMovie(false)
        handleAxios("",1,"movie")
      }
      if(props.series&&entrySeries){
        console.log("papa")
        setType("series")
        setEntrySeries(false)
        handleAxios("",1,"series")
      }
      if(props.episode&&entryEpisode){
        console.log("nana")
        setType("episode")
        setEntryEpisode(false)
        handleAxios("",1,"episode")
      }
  })
  const handlePrevious=()=>{
    let pre=Number(page)-1
    setPage(pre)
    console.log(pre)
    handleAxios(search,pre,type)
  }
  const handleNext=()=>{
    let nxt=Number(page)+1
    setPage(nxt)
    console.log(nxt)
    handleAxios(search,nxt,type)
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
                <InputBase {...params} type="search"
                onChange={handleChange} label="Combo box" 
                  className={classes.input} fullWidth
                  placeholder="Search For Movies"
                />
              )}
            />        
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>
      <br/> <br/> <br/> <br/>
      <Grid container justify="center" >
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
const top100Films = []
