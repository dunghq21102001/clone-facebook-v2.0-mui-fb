import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import fbLogo from '../assets/fbLogo.svg.webp'
import { Avatar, CardMedia, IconButton, Menu, MenuItem, TextField, Tooltip, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import GroupsIcon from '@mui/icons-material/Groups';
function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#fff', width: '100%', top: 0, left: 0, right: 0 }}>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '10px 0', flexDirection: { xs: 'column-reverse', sm: 'row' } }}>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'space-around', width: '25%', alignItems: 'center' }}>
          <CardMedia sx={{ width: '50px', height: '50px' }} component='img' image={fbLogo} alt='fb-logo' />
          <TextField id="outlined-basic" label="Search on Facebook" variant="outlined" />
        </Box>
        <Box sx={{ width: { xs: '100%', sm: '45%' }, display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingTop: { xs: '10px', sm: '0' } }}>
          <HomeIcon sx={{ color: '#1977f3', fontSize: '34px', cursor: 'pointer',  }} />
          <FlagIcon sx={{ color: '#1977f3', fontSize: '34px', cursor: 'pointer',  }} />
          <OndemandVideoIcon sx={{ color: '#1977f3', fontSize: '34px', cursor: 'pointer',  }} />
          <StoreMallDirectoryIcon sx={{ color: '#1977f3', fontSize: '34px', cursor: 'pointer',  }} />
          <GroupsIcon sx={{ color: '#1977f3', fontSize: '34px', cursor: 'pointer',  }} />
        </Box>
        <Box sx={{ width: { xs: '100%', sm: '25%' }, display: 'flex', justifyContent: { xs: 'space-around', sm: 'flex-end' }, alignItems: 'center' }}>
          <Typography variant='h5' sx={{ cursor: 'pointer', color: 'black', display: { xs: 'none', sm: 'block' } }}>
            Dungh ok chua?
          </Typography>
          <TextField id="outlined-basic" label="Search on Facebook" variant="outlined" sx={{ display: { xs: 'block', sm: 'none' } }} />
          <Box sx={{ flexGrow: 0, padding: '0 20px' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="https://img.freepik.com/free-photo/adorable-pomeranian-spitz-dog-sitting-wooden-bench-beach_181624-38855.jpg?w=2000" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
    </AppBar>
  )
}

export default Header