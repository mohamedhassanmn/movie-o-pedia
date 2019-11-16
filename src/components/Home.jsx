import React from 'react';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import Search from './Search'
import styles from './login.module.css'
import Userinfo from './User_info'
import Moviepage from './Moviepage';
import {Route} from 'react-router-dom'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  welcomeNote:{
    fontFamily: 'Alatsi, sans-serif',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor:"rgba(149, 175, 192,1.0)",
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    margin:"10% 0",
    flexGrow: 1,
    textAlign:"center",
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
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
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const [icons,setIcon]=React.useState([<Icon className="far fa-eye"></Icon>,<Icon className="far fa-smile-beam"></Icon>,<Icon className="fas fa-history"></Icon>,<Icon className="fas fa-sort-alpha-up-alt"></Icon>])
  const [typeIcon,setTypeIcon]=React.useState([<Icon className="fas fa-film"></Icon>,<Icon className="fas fa-video"></Icon>,<Icon className="far fa-file-video"></Icon>])
  const [movie,setMovie]=React.useState(false)
  const [series,setSeries]=React.useState(false)
  const[episode,setEpisode]=React.useState(false)
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleTypeClick=(e)=>{
    let type=e.target.textContent
    if(type=="Movies"){
        setMovie(true)
    }else if(type=="Series"){
        setSeries(true)
    }else if(type=="Episode"){
        setEpisode(true)
    }
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed"  className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar className={classes.custom_toolbar}>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        <Typography className={classes.logo} variant="h6" noWrap>
            <Icon style={{fontSize:"40px",color:"rgba(223, 249, 251,1.0)"}} className="fas fa-film"></Icon>
          <Typography className={styles.logo_name_menu}>Movie-O-pedia</Typography>
        </Typography>
        <div className={classes.userinfo}>   
            <Userinfo/>
        </div>
        </Toolbar>
      </AppBar>
      {localStorage.getItem("zoom")?(
        <Route  path="/home/:Id" render={(props)=><Moviepage {...props}/>} />
      ):(
        <>
          <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
              <List>
                {['Starred', 'Likes','Chronological View', 'Sort A-Z'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{icons[index]}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            <Divider />
              <List>
                {['Movies', 'Series', 'Episode'].map((text, index) => (
                  <ListItem onClick={handleTypeClick}  button key={text}>
                    <ListItemIcon>{typeIcon[index]}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
          </Drawer>
          <main  className={clsx(classes.content, {
          [classes.contentShift]: open,
          })}>
            <div className={classes.toolbar} />
            {localStorage.getItem("username")!=null?(
            <Typography  variant="h5">
                Welcome! <span className={classes.welcomeNote}>{localStorage.getItem("username")}</span>
            </Typography>):null}
            <br/> <br/>
            <Search movie={movie} series={series} episode={episode} />
          </main>
        </>
          )}
    </div>
  );
}