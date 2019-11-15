import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import {Link,Route} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Moviepage from './Moviepage';

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
  console.log(props.data)
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClick=(e)=>{
    console.log(e.target.id)
  }
  const handleZoom=(e)=>{
    localStorage.setItem("zoom",true)
  }
  return (
      <React.Fragment>
        {props.data!=undefined?(
            <React.Fragment>
                {props.data.map((e,i)=>{
                    return(
                      <div key={i}>
                      <Link to={`/home/${e.Title}/`}>
                        <Card id="hello" onClick={handleZoom} className={classes.card} key={i} >
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
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                <Typography variant="subtitle1">{e.Type}</Typography>
                                </IconButton>
                                <Typography variant="subtitle1">{e.Year}</Typography>
                            </CardActions>
                        </Card>
                      </Link>
                      </div>
                    )})}
        </React.Fragment>):<Typography>no results found</Typography>}
    </React.Fragment>
  );
}