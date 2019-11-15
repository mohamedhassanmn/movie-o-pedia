import React from 'react';
import {Redirect} from 'react-router-dom'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar'

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [logout,setLogout]=React.useState(false)

  const handleLogout=()=>{
    setLogout(true)
    localStorage.removeItem("username")
  }
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
     {localStorage.getItem("username")!=null? <Avatar aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {localStorage.getItem("username")[0].toUpperCase()}
      </Avatar>:null}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}><div onClick={handleLogout}>Logout</div></MenuItem>
      </Menu>
      {logout?<Redirect to="/" />:null}
    </div>
  );
}