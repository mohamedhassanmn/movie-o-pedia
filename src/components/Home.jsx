import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Search from './Search'
import styles from './login.module.css'
import Userinfo from './User_info'
import Moviepage from './Moviepage';
import {Route} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  welcomeNote:{
    fontFamily: 'Alatsi, sans-serif',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor:"rgba(149, 175, 192,1.0)"
  },
  content: {
    margin:"13% 0",
    flexGrow: 1,
    textAlign:"center",
  },
  logo:{
      display:"flex",
      alignItems:"center"
  },
  custom_toolbar:{
    display:"flex",
    justifyContent:"space-between"
  },
  userinfo:{
      display:"flex",
      alignItems:"center",
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />

  {/* NavBar */}

      <AppBar position="fixed"  className={classes.appBar}>
        <Toolbar className={classes.custom_toolbar}>
          <Typography className={classes.logo} variant="h6" noWrap>
            <Icon style={{fontSize:"40px",color:"rgba(223, 249, 251,1.0)"}} className="fas fa-film"></Icon>
            <Typography className={styles.logo_name_menu}>Movie-O-pedia</Typography>
          </Typography>
          <div className={classes.userinfo}>   
            <Userinfo/>
          </div>
        </Toolbar>
      </AppBar>

  {/* after clicking on the result image */}

      {localStorage.getItem("zoom")?(
        
        <Route  path="/home/:Id" render={(props)=><Moviepage {...props}/>} />
       ):( 
          <main  className={classes.content}>
            <div className={classes.toolbar} />
            {localStorage.getItem("username")!=null?(
            <Typography  variant="h5">
                Welcome! <span className={classes.welcomeNote}>{localStorage.getItem("username")}</span>
            </Typography>):null}
            <br/> <br/>
            <Search/>
          </main>
         )} 
    </div>
  );
}