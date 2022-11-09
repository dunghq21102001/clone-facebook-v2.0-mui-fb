import { AccessTime, Home, RssFeed, School } from '@mui/icons-material'
import { Box, Button, CardMedia, Link, List, ListItem, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

function ProfileIntroduce() {
    const user = useSelector(store => store.access).user.user
    const followers = Math.floor(Math.random() * 50000)
    return (
        <Box sx={{ width: '100%', backgroundColor: '#ebe7e7', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='h4' textAlign='left' padding='10px 0 10px 10px' fontWeight='bold'>
                Introduce
            </Typography>
            <Box sx={{ width: '100%' }}>
                <Typography variant='h5' textAlign='center'>
                    ♥dlaskdus♥
                </Typography>
                <Typography variant='h5' textAlign='center'>
                    All or nothing
                </Typography>
                <Typography variant='h5' textAlign='center'>
                    오늘 컨디션 어때요?
                </Typography>
                <Typography variant='h5' textAlign='center'>
                    불고기가 먹으러 갈래?
                </Typography>
            </Box>
            <Button variant='contained' sx={{ width: '80%', margin: '30px 0' }}>
                Edit Bio
            </Button>

            <Box sx={{ width: '100%' }}>
                <List sx={{ fontSize: '16px', fontFamily: 'sans-serif', paddingBottom: 0 }}>
                    <ListItem>
                        <School color='primary' sx={{ marginRight: '20px', fontSize: '28px' }} />
                        Study software engineering at FPT University HCM
                    </ListItem>
                    <ListItem>
                        <School color='primary' sx={{ marginRight: '20px', fontSize: '28px' }} />
                        Attended PVS high school
                    </ListItem>
                    <ListItem>
                        <Home color='primary' sx={{ marginRight: '20px', fontSize: '28px' }} />
                        Live in Ho Chi Minh city
                    </ListItem>
                    <ListItem>
                        <AccessTime color='primary' sx={{ marginRight: '20px', fontSize: '28px' }} />
                        Join at {user.metadata.creationTime}
                    </ListItem>
                    <ListItem>
                        <RssFeed color='primary' sx={{ marginRight: '20px', fontSize: '28px' }} />
                        Have {followers} followers
                    </ListItem>
                </List>
            </Box>
            <Button variant='contained' sx={{ width: '80%', margin: '30px 0' }}>
                Edit Details
            </Button>
            <Box sx={{ width: '100%', height: '60vh', overflowY: 'scroll', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <CardMedia sx={{ maxWidth: '170px', margin: '10px' }} component='img' image='http://images6.fanpop.com/image/photos/43000000/Nayeon-Feel-Special-promotion-photoshoot-by-Naver-x-Dispatch-nayeon-twice-43020178-2000-3000.jpg' />
                <CardMedia sx={{ maxWidth: '170px', margin: '10px' }} component='img' image='http://images6.fanpop.com/image/photos/43000000/Nayeon-Feel-Special-promotion-photoshoot-by-Naver-x-Dispatch-nayeon-twice-43020178-2000-3000.jpg' />
                <CardMedia sx={{ maxWidth: '170px', margin: '10px' }} component='img' image='http://images6.fanpop.com/image/photos/43000000/Nayeon-Feel-Special-promotion-photoshoot-by-Naver-x-Dispatch-nayeon-twice-43020178-2000-3000.jpg' />
                <CardMedia sx={{ maxWidth: '170px', margin: '10px' }} component='img' image='https://img.wattpad.com/1d7ffdc9348ca292d11a90c41c5461f8bd967a08/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f4a422d35426635647743726f53513d3d2d3539353639333732352e313533633435373439383230313432643337313330383335363531332e6a7067' />
                <CardMedia sx={{ maxWidth: '170px', margin: '10px' }} component='img' image='http://images6.fanpop.com/image/photos/43000000/Nayeon-Feel-Special-promotion-photoshoot-by-Naver-x-Dispatch-nayeon-twice-43020178-2000-3000.jpg' />
                <CardMedia sx={{ maxWidth: '170px', margin: '10px' }} component='img' image='https://data.whicdn.com/images/338906902/original.png?t=1603729958' />
                <CardMedia sx={{ maxWidth: '170px', margin: '10px' }} component='img' image='https://static.asiachan.com/Im.Nayeon.full.249087.jpg' />
            </Box>
        </Box>
    )
}

export default ProfileIntroduce