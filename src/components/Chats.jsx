import { Avatar, Box, Typography } from '@mui/material'
import { doc, onSnapshot } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../firebase'
import { changeUser } from '../pages/ChatsSlice'

function Chats() {
    const user = useSelector(store => store.access).user.user
    const [chats, setChats] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userChats', user.uid), (doc) => {
                setChats(doc.data())
            })
            return () => {
                unsub()
            }
        }
        user.uid && getChats()
    }, [user.uid])
    
    const handleSelect = (uInfo, currU) => {
        dispatch(changeUser({
            uInfo: uInfo,
            currU: currU
        }))
    }
    console.log(chats);
    return (
        <>
            {Object?.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map(chat => (
                <Box key={chat[0]} onClick={() => handleSelect(chat[1].userInfo, user)} sx={{ display: 'flex', width: '100%', marginTop: '20px', ":hover": { backgroundColor: 'rgba(0,0,0,0.1)' }, padding: '5px', cursor: 'pointer', alignItems: 'center', userSelect: 'none' }}>
                    <Avatar alt="" src={chat[1].userInfo?.photoURL} />
                    <Box sx={{ width: '100%', marginLeft: '20px' }}>
                        <Typography variant='h6'>{chat[1].userInfo?.displayName}</Typography>
                        <Typography variant='h6'>{chat[1].lastMessage?.text}</Typography>
                    </Box>
                </Box>
            ))}

        </>
    )
}

export default Chats