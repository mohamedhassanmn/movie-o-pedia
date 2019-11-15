import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import {Link} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import Rating from '@material-ui/lab/Rating'


const useStyles = makeStyles(theme => ({
  card: {
    width: "70%",
    height:"160vh",
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
  }
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClickBack=()=>{
    localStorage.removeItem("zoom")
    }
  console.log(props.data)
  return (
    <Card className={classes.card}>
      <Link to="/home"><Typography className={classes.close} variant="h5" onClick={handleClickBack}>X</Typography></Link>
      <CardHeader
        action={
            <>
            <Typography component="legend">imdbRating</Typography>
            <Rating name="read-only" value={props.data.imdbRating} max={10} readOnly />
            {props.data.Ratings.map((e)=>{
                return(
                    <>
                        <Typography>{e.Source}</Typography>
                        <Typography>{e.Value}</Typography>
                    </>
                )
            })}
            </>
        }
        title={props.data.Title}
        subheader={props.data.Type}
      />
      <CardMedia
        className={classes.media}
        image={props.data.Poster}
        title={props.data.Title}
      />
      <CardContent>
      <List className={classes.card}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <Icon class="fas fa-calendar-alt"></Icon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Released" secondary={props.data.Released} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <Icon class="fas fa-universal-access"></Icon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Actors" secondary={props.data.Actors} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <Icon class="fas fa-trophy"></Icon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Awards" secondary={props.data.Awards} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <Icon class="fas fa-briefcase"></Icon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="BoxOffice" secondary={props.data.BoxOffice} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <Icon class="fas fa-photo-video"></Icon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Plot" secondary={props.data.Plot} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <Icon class="fas fa-language"></Icon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Language" secondary={props.data.Language} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <Icon class="fas fa-pen-alt"></Icon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Writer" secondary={props.data.Writer} />
      </ListItem>
    </List>
      </CardContent>
    </Card>
  );
}