import React from 'react';
import {Redirect} from 'react-router-dom'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar'

export default function UserInfo() {
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
    localStorage.removeItem("zoom")
    setAnchorEl(null);
  };

  return (
    <div>
     {localStorage.getItem("username")!=null? <Avatar style={{backgroundColor:"rgba(243, 156, 18,1.0)",cursor:"pointer"}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {localStorage.getItem("username")[0].toUpperCase()}
      </Avatar>:null}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><div onClick={handleLogout}>Logout</div></MenuItem>
      </Menu>
      {logout?<Redirect to="/" />:null}
    </div>
  );
}