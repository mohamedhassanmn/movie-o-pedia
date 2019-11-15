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
    maxWidth: 345,
    marginRight:30,
    marginBottom:30,
    cursor:"pointer"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
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
  return (
      <React.Fragment>
        {props.data!=undefined?(
            <React.Fragment>
                {props.data.map((e,i)=>{
                    return(
                      <div key={i}>
                      <Link to={`/home/${e.Title}/`}>
                        <Card className={classes.card} key={i} >
                            <CardHeader
                                action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                                }
                                title={e.Title}
                                subheader={e.Year}
                            />
                            <CardMedia
                                className={classes.media}
                                image={e.Poster}
                                title="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                <Typography variant="body2">{e.Type}</Typography>
                                </IconButton>
                                <IconButton aria-label="share">
                                <ShareIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                      </Link>
                      </div>
                    )})}
        </React.Fragment>):<Typography>no results found</Typography>}
    </React.Fragment>
  );
}