import { Box, Button } from '@mui/material'
import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { useSelector } from 'react-redux'
import { db } from '../firebase'

function DeletePostPopup({ setOpenDeletePopup, post }) {
    const posts = useSelector(store => store.posts)
    console.log(posts)
    const handleDeletePost = async (id) => {
        setOpenDeletePopup(false)
        await deleteDoc(doc(db, 'posts', id))
    }
    return (
        <Box sx={{ width: '100%', position: 'relative' }}>
            <Box sx={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 10 }}></Box>
            <Box sx={{ width: { xs: '90%', sm: '270px' }, height: { xs: '85px', md: '120px' }, position: 'absolute', backgroundColor: 'white', top: '50%', left: '50%', translate: '-50% -50%', borderRadius: '10px', zIndex: 20, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <Button sx={{ fontSize: '18px', backgroundColor: 'green' }} onClick={() => setOpenDeletePopup(false)} variant='contained'>Cancel</Button>
                <Button onClick={() => handleDeletePost(post.id)} sx={{ fontSize: '18px', backgroundColor: 'red' }} variant='contained'>Delete</Button>
            </Box>
        </Box>
    )
}

export default DeletePostPopup