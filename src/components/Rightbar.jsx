import React, { useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupIcon from '@mui/icons-material/Group';
import { Avatar, IconButton } from '@mui/material';
import { Bloodtype, EventAvailableTwoTone, ExpandMore, Favorite, FlagCircleOutlined, GroupOutlined, StoreOutlined, VideoCallOutlined, VideoCameraBack } from '@mui/icons-material';
function Rightbar() {
    const [showMore, setShowMore] = useState(false)
    const handleShowMore = () => {
        setShowMore(!showMore)
    }
    const showMoreItems = (
        <>
            <ListItem >
                <ListItemButton>
                    <ListItemIcon>
                        <EventAvailableTwoTone sx={{ color: '#40ce63' }} />
                    </ListItemIcon>
                    <ListItemText primary="Events" />
                </ListItemButton>
            </ListItem>
            <ListItem >
                <ListItemButton>
                    <ListItemIcon>
                        <FlagCircleOutlined sx={{ color: '#e92c4c' }} />
                    </ListItemIcon>
                    <Bloodtype primary="Blood Donation" />
                </ListItemButton>
            </ListItem>
            <ListItem >
                <ListItemButton>
                    <ListItemIcon>
                        <Favorite sx={{ color: '#f6c23b' }} />
                    </ListItemIcon>
                    <ListItemText primary="Favorite" />
                </ListItemButton>
            </ListItem>
            <ListItem >
                <ListItemButton>
                    <ListItemIcon>
                        <VideoCameraBack sx={{ color: '#e82949' }} />
                    </ListItemIcon>
                    <ListItemText primary="Live video" />
                </ListItemButton>
            </ListItem>
        </>
    )
    return (
        <List
            sx={{ width: '100%', boxShadow: '0px 0px 5px #000', height: '100vh', overflowY: 'auto' }}
            aria-label="contacts"
        >
            <ListItem sx={{ paddingTop: '30px' }}>
                <ListItemButton>
                    <ListItemIcon>
                        <IconButton sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="https://img.freepik.com/free-photo/adorable-pomeranian-spitz-dog-sitting-wooden-bench-beach_181624-38855.jpg?w=2000" />
                        </IconButton>
                    </ListItemIcon>
                    <ListItemText primary="DungHQ21" />
                </ListItemButton>
            </ListItem>
            <ListItem >
                <ListItemButton>
                    <ListItemIcon>
                        <GroupIcon sx={{ color: '#4fd4c3' }} />
                    </ListItemIcon>
                    <ListItemText primary="Friends" />
                </ListItemButton>
            </ListItem>
            <ListItem >
                <ListItemButton>
                    <ListItemIcon>
                        <FlagCircleOutlined sx={{ color: '#4fd4c3' }} />
                    </ListItemIcon>
                    <ListItemText primary="Pages" />
                </ListItemButton>
            </ListItem>
            <ListItem >
                <ListItemButton>
                    <ListItemIcon>
                        <GroupOutlined sx={{ color: '#197ff4' }} />
                    </ListItemIcon>
                    <ListItemText primary="Groups" />
                </ListItemButton>
            </ListItem>
            <ListItem >
                <ListItemButton>
                    <ListItemIcon>
                        <StoreOutlined sx={{ color: '#ef405e' }} />
                    </ListItemIcon>
                    <ListItemText primary="Marketplace" />
                </ListItemButton>
            </ListItem>
            <ListItem >
                <ListItemButton>
                    <ListItemIcon>
                        <VideoCallOutlined sx={{ color: '#1879f2' }} />
                    </ListItemIcon>
                    <ListItemText primary="Watch" />
                </ListItemButton>
            </ListItem>
            <ListItem onClick={handleShowMore}>
                <ListItemButton>
                    <ListItemIcon>
                        <ExpandMore sx={{ color: '#1879f2' }} />
                    </ListItemIcon>
                    <ListItemText primary={showMore ? 'Hide away' : 'Show more'} />
                </ListItemButton>
            </ListItem>
            {showMore ? showMoreItems : ''}
        </List>
    )
}

export default Rightbar