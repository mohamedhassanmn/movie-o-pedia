import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import {Link} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  card: {
    width: 345,
    marginRight:30,
    marginBottom:30,
    cursor:"pointer"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundSize:"cover !important"
  },
  content:{
    backgroundColor:"rgba(52, 73, 94,0.6) !important",

  },
  text:{
    fontFamily: 'Arvo, serif',
    fontSize:"20px !important",
    color:"rgba(236, 240, 241,1.0)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Display(props) {
  const classes = useStyles();
  // console.log(props.data)
  const handleZoom=(e)=>{
    localStorage.setItem("zoom",true)
  }
  return (
      <React.Fragment>
        {props.data!==undefined?(
          <>
            {props.data.map((e,i)=>{
                return(
                  <div key={i}>
                    <Card id="hello" className={classes.card} key={i} >
                      <Link to={`/home/${e.Title}/`}>
                        <div onClick={handleZoom}>
                          <CardMedia
                              className={classes.media}
                              image={e.Poster}
                              title="Paella dish"
                          />
                          <CardContent className={classes.content}>
                              <Typography className={classes.text} variant="h5" color="textSecondary" component="p">
                                {e.Title}
                              </Typography>
                          </CardContent>
                        </div>
                      </Link>
                      <CardActions>
                          <IconButton aria-label="add to favorites">
                          <Typography variant="subtitle1">{e.Type}</Typography>
                          </IconButton>
                          <Typography variant="subtitle1">{e.Year}</Typography>
                      </CardActions>
                    </Card>
                  </div>
                )
              }
            )
          }
        </>
        ):(
          <Typography>no results found</Typography>
        )}
    </React.Fragment>
  );
}