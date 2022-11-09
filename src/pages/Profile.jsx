import React from 'react'
import { Avatar, Box, Button, CardMedia, List, ListItem, Typography } from '@mui/material'
import { AddCircle, Edit, ExpandMore } from '@mui/icons-material'
import ProfilePosts from '../components/ProfilePosts'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
function Profile() {
    const user = useSelector(store => store.access).user.user
    // const posts = useSelector(store => store.posts).postsArr
    const randomFriends = Math.floor(Math.random() * 1000)
    return (
        <Box sx={{ width: '100%' }}>
            <Header />
            <Box sx={{ width: '100%', height: '100vh', backgroundColor: '#ebe7e7    ', position: 'relative', top: 0, left: 0 }}>
                <Box sx={{ width: '80%', position: 'absolute', left: '50%', top: '0', translate: '-50% 0', backgroundColor: '#18191a', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px', height: '400px' }}>
                    <Box sx={{ width: '100%', position: 'absolute', bottom: '-150px', left: '0', display: 'flex', justifyContent: 'space-around' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CardMedia alt="User's picture" component='img' image={user?.photoURL} sx={{ width: '180px', height: '180px', borderRadius: '50%', marginLeft: '40px' }} />
                            <Box sx={{ padding: '20px 30px' }}>
                                <Typography variant='h5'>
                                    {user?.displayName || user?.email}
                                </Typography>
                                <Typography variant='h6'>
                                    {randomFriends} friends
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button variant='contained'>
                                <AddCircle />
                                Add to news
                            </Button>
                            <Button variant='contained' sx={{ backgroundColor: '#3a3b3c', marginLeft: '20px', ":hover": { backgroundColor: '#606162' } }}>
                                <Edit />
                                Edit profile
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <hr />
                <List sx={{ position: 'absolute', bottom: 0, left: '50%', translate: '-50% 0', display: 'flex', width: '80%', textAlign: 'center', fontFamily: 'sans-serif' }}>
                    <ListItem disablePadding sx={{
                        cursor: 'pointer', padding: '20px 0', justifyContent: 'center', fontSize: '20px', ":hover": {
                            backgroundColor: '#cdd0d3', borderRadius: '10px'
                        }
                    }}>Posts</ListItem>
                    <ListItem disablePadding sx={{
                        cursor: 'pointer', padding: '15px 0', justifyContent: 'center', fontSize: '20px', ":hover": {
                            backgroundColor: '#cdd0d3', borderRadius: '10px'
                        }
                    }}>Introduce</ListItem>
                    <ListItem disablePadding sx={{
                        cursor: 'pointer', padding: '20px 0', justifyContent: 'center', fontSize: '20px', ":hover": {
                            backgroundColor: '#cdd0d3', borderRadius: '10px'
                        }
                    }}>Friends</ListItem>
                    <ListItem disablePadding sx={{
                        cursor: 'pointer', padding: '20px 0', justifyContent: 'center', fontSize: '20px', ":hover": {
                            backgroundColor: '#cdd0d3', borderRadius: '10px'
                        }
                    }}>Images</ListItem>
                    <ListItem disablePadding sx={{
                        cursor: 'pointer', padding: '20px 0', justifyContent: 'center', fontSize: '20px', ":hover": {
                            backgroundColor: '#cdd0d3', borderRadius: '10px'
                        }
                    }}>Videos</ListItem>
                    <ListItem disablePadding sx={{
                        cursor: 'pointer', padding: '20px 0', justifyContent: 'center', fontSize: '20px', ":hover": {
                            backgroundColor: '#cdd0d3', borderRadius: '10px'
                        }
                    }}>Check in</ListItem>
                    <ListItem disablePadding sx={{
                        cursor: 'pointer', padding: '20px 0', justifyContent: 'center', fontSize: '20px', ":hover": {
                            backgroundColor: '#cdd0d3', borderRadius: '10px'
                        }
                    }}>
                        <ExpandMore />
                        More
                    </ListItem>
                </List>
            </Box>
            <ProfilePosts />
        </Box>
    )
}

export default Profile