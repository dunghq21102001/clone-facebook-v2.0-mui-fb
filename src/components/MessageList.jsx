import React, { useState } from 'react'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, Timestamp, updateDoc, where } from 'firebase/firestore'
import { Avatar, Box, TextField, Typography } from '@mui/material'
import { db } from '../firebase'
import { useSelector } from 'react-redux'
import Chats from './Chats'
function MessageList() {
    // const users = useSelector(store => store.users).usersArr
    const user = useSelector(store => store.access).user.user
    // const foundUser = users.find(element => element.displayName == user.displayName && element.email == user.email)
    // const usersList = users.filter(user => user !== foundUser)
    const [search, setSearch] = useState('')
    const [userFound, setUserFound] = useState(null)
    const [err, setErr] = useState(false)
    const handleKey = (e) => {
        e.code === "Enter" && handleSearch()
    }
    const handleSearch = async (e) => {
        const q = query(collection(db, 'users'), where('displayName', '==', search))
        try {
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                setUserFound(doc.data())
            })
        } catch (err) {
            console.log(err);
            setErr(true)
        }
    }
    const handleSelect = async () => {
        const combinedId = user.uid > userFound.uid
            ? user.uid + userFound.uid
            : userFound.uid + user.uid

        try {
            const res = await getDoc(doc(db, 'chats', combinedId))
            console.log(res);
            if (!res.exists()) {
                console.log('co vao day du` da exist ko?');
                //create chat in chats collection
                await setDoc(doc(db, 'chats', combinedId), {
                    messages: []
                })

                // create user chats
                await updateDoc(doc(db, 'userChats', user.uid), {
                    [combinedId + '.userInfo']: {
                        uid: userFound.uid,
                        displayName: userFound.displayName,
                        photoURL: userFound.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp()
                })

                await updateDoc(doc(db, 'userChats', userFound.uid), {
                    [combinedId + '.userInfo']: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp()
                })
            }
        } catch (err) { console.log(err) }
        setUserFound(null)
        setSearch('')
    }
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='h5'>
                Chats
            </Typography>
            <TextField variant='outlined' sx={{ width: '80%' }} placeholder='Search Messenger' value={search} onKeyDown={handleKey} onChange={(e) => setSearch(e.target.value)} />

            <Box sx={{ height: { xs: '100%', sm: '65vh' }, overflowY: 'scroll', width: '80%' }}>
                {err && <span>User not found!</span>}
                {userFound && <Box onClick={handleSelect} sx={{ display: 'flex', width: '100%', marginTop: '20px', ":hover": { backgroundColor: 'rgba(0,0,0,0.1)' }, padding: '5px', cursor: 'pointer', alignItems: 'center', userSelect: 'none' }}>
                    <Avatar alt="Remy Sharp" src={userFound.photoURL} />
                    <Box sx={{ width: '100%', paddingLeft: '10px' }}>
                        <Typography variant='h6'>{userFound.displayName}</Typography>
                        <Typography variant='h6'>Noways to ...</Typography>
                    </Box>
                </Box>}
                <hr />
                {/* {usersList.map((user) => (
                    <Box key={user.uid} sx={{ display: 'flex', width: '100%', marginTop: '20px', ":hover": { backgroundColor: 'rgba(0,0,0,0.1)' }, padding: '5px', cursor: 'pointer', alignItems: 'center', userSelect: 'none' }}>
                        <Avatar alt="" src={user.photoURL} />
                        <Box sx={{ width: '100%', marginLeft: '20px' }}>
                            <Typography variant='h6'>{user.displayName}</Typography>
                            <Typography variant='h6'>Noways to ...</Typography>
                        </Box>
                    </Box>
                ))} */}
                <Chats />
            </Box>
        </Box>
    )
}

export default MessageList