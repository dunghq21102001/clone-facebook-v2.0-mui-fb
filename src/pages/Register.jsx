import { Box, Button, CardMedia, Typography } from '@mui/material'
import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../AuthContext'
function Register({ setOpenRegister }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // const navigate = useNavigate()
    const { user, signUp } = UserAuth()
    const handleSubmitRegister = async (e) => {
        e.preventDefault()
        try {
            await signUp(username, password)
            setOpenRegister(false)
            // navigate('/')
        } catch (err) {
            alert(err)
        }
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Box onClick={() => setOpenRegister(false)} sx={{ position: 'relative', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', width: '100vw', height: '100vh' }}></Box>
            <form
                // onSubmit={handleSubmitRegister}
                style={{ width: '60%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column', backgroundColor: 'white', padding: '40px 10px', borderRadius: '20px', position: 'absolute', left: '50%', top: '50%', translate: '-50% -50%' }}>
                <Box
                    onClick={() => setOpenRegister(false)}
                    sx={{ width: '5%', cursor: 'pointer', position: 'absolute', right: 10, top: 10 }}>
                    <CardMedia component='img' image='https://www.freeiconspng.com/thumbs/close-icon/close-icon-15.png' alt='close' sx={{ width: '100%' }} />
                </Box>
                <input type='text' required style={{ width: '80%', borderRadius: '10px', outline: 'none', padding: '20px 10px', fontSize: '20px', backgroundColor: '#d9d6d6', border: 'none', margin: '20px 0' }} placeholder='Email' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type='password' required style={{ width: '80%', borderRadius: '10px', outline: 'none', padding: '20px 10px', fontSize: '20px', backgroundColor: '#d9d6d6', border: 'none', margin: '20px 0' }} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                {/* <input type='file' style={{ width: '80%', display: 'none' }} id='fileInput' />
                <label htmlFor='fileInput' style={{ margin: '20px 0', width: '80%', display: 'flex', alignItems: 'center' }}>
                    <CardMedia component='img' image='https://media.istockphoto.com/vectors/image-upload-icon-vector-id1206577970?k=20&m=1206577970&s=170667a&w=0&h=53at7rxKBtZd8woBU2fXSN9nUygXzabXPN4QPxgdsCA=' sx={{ width: '70px', cursor: 'pointer' }} alt='add avatar' />
                    <Typography sx={{ padding: '0 10px', cursor: 'pointer' }} variant='h6'>Add an avatar</Typography>
                </label> */}
                <Button variant='outlined' onClick={handleSubmitRegister} sx={{ width: '60%', padding: '10px 0' }}>Register</Button>
                {/* onClick={() => setOpenRegister(false)} */}
            </form>
        </Box >
    )
}

export default Register