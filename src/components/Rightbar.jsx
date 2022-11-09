import { Menu, Search, SearchOff, VideoCallSharp } from '@mui/icons-material'
import { Avatar, Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Rightbar() {
    const users = useSelector(store => store.users).usersArr
    const user = useSelector(store => store.access).user.user
    const foundUser = users.find(element => element.displayName == user.displayName && element.email == user.email)
    const usersList = users.filter(user => user !== foundUser)
    return (
        <Box sx={{ width: '100%', height: '100vh', overflowY: 'auto', paddingTop: '30px' }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                <Typography variant='h6'>
                    Friend Request
                </Typography>
                <Typography variant='h6' sx={{ cursor: 'pointer', color: 'blue' }}>
                    Show All
                </Typography>
            </Box>
            <Typography variant='h6' sx={{ textAlign: 'center', paddingBottom: '20px' }}>
                No one
            </Typography>
            <hr />
            <Box width='100%' sx={{ paddingTop: '20px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', }}>
                    <Typography variant='h6' sx={{ width: '50%' }}>Contact</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '50%' }}>
                        <VideoCallSharp sx={{ cursor: 'pointer' }} />
                        <Search sx={{ cursor: 'pointer' }} />
                        <Menu sx={{ cursor: 'pointer' }} />
                    </Box>
                </Box>
                <List sx={{ width: '100%' }}>

                    {usersList.map((user) => (
                        <Link key={user.uid} to={'/message'}>
                            <ListItem  sx={{ width: '100%', padding: 0 }}>
                                <ListItemButton sx={{ width: '100%' }}>
                                    <Avatar alt="" src={user.photoURL} />
                                    <ListItemText primary={user.displayName} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Box>
        </Box>
    )
}

export default Rightbar