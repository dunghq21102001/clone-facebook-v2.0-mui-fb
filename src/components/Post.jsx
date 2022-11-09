import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Box, TextField } from '@mui/material';
import { ReactionBarSelector } from '@charkour/react-reactions';
import { Delete, EditTwoTone, SendOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import EditPost from './EditPost';
import DeletePostPopup from './DeletePostPopup';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
function Post({ profileImg, username, image, timestamp, message, reactCount, post }) {

    const user = useSelector(store => store.access).user.user
    const [openEdit, setOpenEdit] = useState(false)
    const [openDeletePopup, setOpenDeletePopup] = useState(false)
    const [openComment, setOpenComment] = useState(false)
    const handleSelectReactions = async () => {
        await updateDoc(doc(db, 'posts', post.id), {
            reactCount: reactCount + 1
        })

    }
    const handleOpenComment = () => {
        setOpenComment(!openComment)
    }
    return (
        <Box sx={{ width: '100%' }}>
            {openEdit ? <EditPost setOpenEdit={setOpenEdit} post={post} /> : ''}
            {openDeletePopup ? <DeletePostPopup setOpenDeletePopup={setOpenDeletePopup} post={post} /> : ''}
            <Card sx={{ width: '100%', margin: '20px 0', boxShadow: '0px 0px 5px #000' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: { xs: 'flex-start', sm: 'center' }, flexDirection: { xs: 'column', sm: 'row' } }}>
                            <Avatar alt="Remy Sharp" src={profileImg} sx={{ cursor: 'pointer' }} />
                            <Box sx={{ cursor: 'pointer', margin: { xs: '0', sm: '0 5px' } }}>
                                <Typography gutterBottom variant="subtitle1" sx={{ margin: '0' }} component="div">
                                    <b>{username}</b>
                                </Typography>
                                <Typography gutterBottom variant="subtitle1" sx={{ margin: '0' }} component="div">
                                    {new Date(timestamp?.toDate()).toUTCString()}
                                </Typography>
                            </Box>
                        </Box>
                        {post.username == user.displayName ? <Box sx={{ display: 'flex' }}>
                            <Button onClick={() => setOpenEdit(true)}><EditTwoTone sx={{ color: 'goldenrod' }} /></Button>
                            <Button onClick={() => setOpenDeletePopup(true)}><Delete sx={{ color: 'red' }} /></Button>
                        </Box> : ''}
                    </Box>
                    <Typography variant="h6" color="black">
                        {message || ''}
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    image={image}
                    alt=""
                    sx={{ width: '95%', display: 'block', margin: '0 auto' }}
                />
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Box sx={{ width: { xs: '100%', sm: '60%' }, userSelect: 'none' }}>
                        <ReactionBarSelector iconSize={30} onSelect={handleSelectReactions} />
                    </Box>
                    <Typography>
                        Reactions: {reactCount}
                    </Typography>
                    <Button variant='contained' sx={{ margin: { xs: '10px 0', sm: '0' } }} onClick={handleOpenComment}>
                        Comment
                    </Button>
                </CardActions>
            </Card>
            {openComment ?
                <Box sx={{ width: '100%', marginBottom: '40px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField sx={{ width: { xs: '80%', sm: '90%' } }} variant='outlined' label='Comment'>
                        </TextField>
                        <SendOutlined sx={{ color: '#1977f3', fontSize: '34px', margin: '0 10px', cursor: 'pointer' }} />
                    </Box>
                    <Box></Box>
                </Box>
                : ''}
        </Box>
    )
}

export default Post