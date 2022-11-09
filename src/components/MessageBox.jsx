import { AttachFile, Call, InsertPhoto, MenuRounded, VideoCall } from '@mui/icons-material'
import { Avatar, Box, Button, CardMedia, TextField, Typography } from '@mui/material'
import { arrayUnion, doc, onSnapshot, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../firebase'
import { v4 as uuid } from 'uuid'
function MessageBox() {
    const user = useSelector(store => store.access).user.user
    const chatsUser = useSelector(store => store.chats)

    const [text, setText] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'chats', chatsUser.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })

        return () => {
            unsub()
        }
    }, [chatsUser.chatId])

    const handleSend = async () => {
        await updateDoc(doc(db, 'chats', chatsUser.chatId), {
            messages: arrayUnion({
                id: uuid(),
                text,
                senderId: user.uid,
                date: Timestamp.now()
            })
        })

        await updateDoc(doc(db, 'userChats', user.uid), {
            [chatsUser.chatId + '.lastMessage']: {
                text
            },
            [chatsUser.chatId + '.date']: serverTimestamp()
        })
        await updateDoc(doc(db, 'userChats', chatsUser.user.uid), {
            [chatsUser.chatId + '.lastMessage']: {
                text
            },
            [chatsUser.chatId + '.date']: serverTimestamp()
        })
        setText('')
    }
    const ref = useRef()
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ paddingLeft: '20px', cursor: 'pointer' }} variant='h6'>{chatsUser.user.displayName}</Typography>
                <Box sx={{ paddingRight: '20px' }}>
                    <Call sx={{ marginLeft: '20px', fontSize: '28px', cursor: 'pointer', color: '#0b92f0' }} />
                    <VideoCall sx={{ marginLeft: '20px', fontSize: '28px', cursor: 'pointer', color: '#0b92f0' }} />
                    <MenuRounded sx={{ marginLeft: '20px', fontSize: '28px', cursor: 'pointer', color: '#0b92f0' }} />
                </Box>
            </Box>
            <hr />
            <Box sx={{ overflowY: 'scroll', height: '60vh', width: '100%' }}>
                {messages.map((mess, index) => (
                    <Box key={index} sx={mess.senderId === user.uid
                        ? { width: '100%', display: 'flex', justifyContent: 'flex-start', flexDirection: 'row-reverse', alignItems: 'flex-end', padding: '20px 0' }
                        : { width: '100%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'row-reverse', alignItems: 'flex-end', padding: '20px 0' }}>
                        <Avatar sx={{ margin: '0 20px' }} alt="Remy Sharp" src={mess.senderId === user.uid ? user.photoURL : chatsUser.user.photoURL} />
                        <Typography variant='h6'>
                            {mess.text}
                        </Typography>
                    </Box>
                ))}

            </Box>
            <hr />
            <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <TextField variant='outlined' placeholder='Type somgthing ...' sx={{ width: '80%' }} value={text} onChange={(e) => setText(e.target.value)} />
                <Box sx={{ width: '20%', display: 'flex', justifyContent: 'space-around' }}>
                    <AttachFile sx={{ fontSize: '36px', color: '#1977f3', cursor: 'pointer' }} />
                    <InsertPhoto sx={{ fontSize: '36px', color: '#1977f3', cursor: 'pointer' }} />
                    <Button onClick={handleSend} variant='outlined' sx={{ backgroundColor: '#1977f3', color: 'white', ":hover": { color: '#1977f3' } }}>Send</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default MessageBox