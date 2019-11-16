import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import {Link} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Rating from '@material-ui/lab/Rating'
import { Grid } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  card: {
    width: "80%",
    height:"100%",
    padding:"3%"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  close:{
      padding:'30px 0 0 30px'
  },
  rating:{
    fontFamily: "Alatsi, sans-serif"
  }
}));

export default function Detailshow(props) {
  const classes = useStyles();
  
  const handleClickBack=()=>{
    localStorage.removeItem("zoom")
    }
  return (
    <Card className={classes.card}>

  {/* link back to home */}

      <Link to="/home">
        <Typography className={classes.close} variant="h5" onClick={handleClickBack}>X</Typography>
      </Link>

      <br/><br/><br/>

  {/* card header  */}

      <Typography className={classes.rating} variant="h4">{props.data.Title}</Typography>
      <Typography className={classes.rating} variant="h5">{props.data.Type}</Typography>

      <br/><br/><br/><br/>

      <Grid container justify="center">
        <Grid item>
          <Typography className={classes.rating} component="legend"variant="h5">IMDbRating</Typography>
          <Rating name="read-only" value={props.data.imdbRating} max={10} readOnly />
        </Grid>

       &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

  {/* ratings of the movie is mapped over here  */}

       <Grid item>
            {props.data.Ratings!==undefined?(
              <Grid container>
                {props.data.Ratings.map((e,i)=>{
                  return(
                    <>
                      <Grid key={i} item>
                          <Typography className={classes.rating} variant="h5">{e.Source}</Typography>
                          <Typography className={classes.rating} variant="h6">{e.Value}</Typography>
                      </Grid>

                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                    </>
                  )
                })}
              </Grid>
            ):null}
        </Grid>
      </Grid>
      <br/> <br/> <br/>

  {/* Poster of the movie */}

      <CardMedia
        className={classes.media}
        image={props.data.Poster}
        title={props.data.Title}
      />
      <CardContent>

  {/* movie  info is listed here */}

    <List className={classes.card}>
      <ListItem key={1}>
        <ListItemAvatar>
          <Avatar>
          <Icon className="fas fa-calendar-alt"></Icon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Released" secondary={props.data.Released} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem key={2}>
        <ListItemAvatar>
          <Avatar>
          <Icon className="fas fa-universal-access"></Icon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Actors" secondary={props.data.Actors} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem key={3}>
        <ListItemAvatar>
          <Avatar>
          <Icon className="fas fa-trophy"></Icon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Awards" secondary={props.data.Awards} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem key={4}>
        <ListItemAvatar>
          <Avatar>
          <Icon className="fas fa-briefcase"></Icon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="BoxOffice" secondary={props.data.BoxOffice} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem key={5}>
        <ListItemAvatar>
          <Avatar>
          <Icon className="fas fa-photo-video"></Icon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Plot" secondary={props.data.Plot} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem key={6}>
        <ListItemAvatar>
          <Avatar>
          <Icon className="fas fa-language"></Icon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Language" secondary={props.data.Language} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem key={7}>
        <ListItemAvatar>
          <Avatar>
          <Icon className="fas fa-pen-alt"></Icon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Writer" secondary={props.data.Writer} />
      </ListItem>
    </List>
      </CardContent>
    </Card>
  );
}