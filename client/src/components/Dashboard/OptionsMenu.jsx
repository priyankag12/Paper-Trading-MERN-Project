import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Badge, { badgeClasses } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Divider, { dividerClasses } from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import { paperClasses } from '@mui/material/Paper';
import { listClasses } from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon, { listItemIconClasses } from '@mui/material/ListItemIcon';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { clearUser } from '../../redux/UserSlice'; 
import { removeToken, removeUserInfo } from '../../auth'; 

const MenuItem = styled(MuiMenuItem)({
  margin: '2px 0',
});

function OptionsMenu({ showBadge = false }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null); 
  }; 

  const handleProfileClick = () => {
    handleClose(); 
    navigate('/profile'); 
  };

  const handleLogout = () => {
    removeToken();
    removeUserInfo();
    dispatch(clearUser());
    navigate('/');
  };

  return (
    <Fragment>
      <Badge
        color="error"
        variant="dot"
        invisible={!showBadge}
        sx={{ [`& .${badgeClasses.badge}`]: { right: 2, top: 2 } }}
      >
        <IconButton
          aria-label="Open menu"
          onClick={handleClick}
          size="small"
          sx={{ borderColor: 'transparent' }}
        >
          <MoreVertRoundedIcon />
        </IconButton>
      </Badge>
      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          [`& .${listClasses.root}`]: {
            padding: '4px',
          },
          [`& .${paperClasses.root}`]: {
            padding: 0,
          },
          [`& .${dividerClasses.root}`]: {
            margin: '4px -4px',
          },
        }}
      >
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem> 
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{
            [`& .${listItemIconClasses.root}`]: {
              ml: 'auto',
              minWidth: 0,
            },
          }}
        >
          <ListItemText>Logout</ListItemText>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </Fragment>
  );
}

OptionsMenu.propTypes = {
  showBadge: PropTypes.bool,
};

export default OptionsMenu;