import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux'
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'

function EditPost({ setOpenEdit, post }) {
    const user = useSelector(store => store.access).user.user
    const [newMessage, setNewMessage] = useState(post.message)
    const [newImg, setNewImg] = useState(post.image)
    const handleEditSubmit = async (e) => {
        e.preventDefault()
        setOpenEdit(false)
        await updateDoc(doc(db, 'posts', post.id), {
            message: newMessage,
            image: newImg
        })
    }
    return (
        <Box sx={{ width: '100%', position: 'relative' }}>
            <Box onClick={() => setOpenEdit(false)} sx={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 10 }}></Box>
            <Box sx={{ width: { xs: '96%', sm: '720px' }, height: { xs: '300px', md: '350px' }, position: 'absolute', backgroundColor: 'white', top: '50%', left: '50%', translate: '-50% -50%', borderRadius: '10px', zIndex: 20 }}>
                <Typography variant='h5' sx={{ textAlign: 'center', padding: '10px 0', fontWeight: 'bold' }}>
                    Edit your post
                </Typography>
                <hr />
                <form onSubmit={handleEditSubmit} style={{ width: '100%' }}>
                    <textarea type='text' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} style={{ width: '100%', outline: 'none', border: 'none', marginTop: '10px', padding: '20px 10px', fontSize: '18px' }} placeholder={`${user?.displayName || user?.email}, What are you thinking?`} />

                    <input type='text' value={newImg} onChange={(e) => setNewImg(e.target.value)} placeholder="Image's source" style={{ width: '100%', backgroundColor: '#dfdcdc', borderRadius: '20px', padding: '20px 10px ', marginTop: '10px', fontSize: '18px', border: 'none', outline: 'none' }} />
                    <Button type='submit' variant='outlined' sx={{ width: '80%', position: 'absolute', left: '50%', bottom: '10px', translate: '-50% 0' }}>
                        Update
                    </Button>
                </form>
            </Box>
        </Box>
    )
}

export default EditPost