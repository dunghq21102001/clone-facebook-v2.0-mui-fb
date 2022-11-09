import { Box, Button, Typography } from '@mui/material'
import { auth, db, provider } from '../firebase'
import React, { useEffect, useState } from 'react'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './AccessSlice'
import Register from './Register'
import { UserAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection, doc, onSnapshot, query, setDoc } from 'firebase/firestore'
import { getListUsers } from './UsersListSlice'

function Login() {
    const { user, logIn } = UserAuth()
    const users = useSelector(store => store.users).usersArr
    console.log(users);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [openRegister, setOpenRegister] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleSubmitLogin = async () => {
        try {
            await logIn(username, password)
            dispatch(login({
                user
            }))
            // const saveUser = users.find(element => element.displayName == user.displayName && element.email == user.email)
            // if (!saveUser) {
            //     addDoc(collection(db, 'users'), {
            //         displayName: user.displayName,
            //         email: user.email,
            //         phoneNumber: user.phoneNumber,
            //         photoURL: user.photoURL,
            //         uid: user.uid
            //     })
            //     addDoc(collection(db, 'userChats'), {
            //     })
            // dispatch(login({
            //     user
            // }))
            // navigate('/')
            // }
            navigate('/')
        } catch (err) {
            alert(err)
        }
    }
    const handleGoogleLogin = async () => {
        await signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result)
                const token = credential.accessToken
                const user = result.user
                const saveUser = users?.find(element => element.displayName == user.displayName && element.email == user.email)
                if (!saveUser) {
                    setDoc(doc(db, 'users', user.uid), {
                        uid: user.uid,
                        displayName: user.displayName,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        photoURL: user.photoURL,
                    })
                    setDoc(doc(db, 'userChats', user.uid), {
                    })
                    // dispatch(login({
                    //     user
                    // }))
                    // navigate('/')
                }
                dispatch(login({
                    user
                }))
                navigate('/')
            }).catch((error) => {
                // const errorCode = error.code
                // const errorMessage = error.message
                // const email = error.customData.email
                const credential = GoogleAuthProvider.credentialFromError(error)
                console.log(credential);
                console.log(error);
            })
    }

    return (
        <Box sx={{ width: '100%', backgroundColor: '#f0f2f5', display: 'flex', alignItems: 'center' }}>
            {openRegister ? '' : <Box sx={{ width: '50%', height: '100vh', display: { xs: 'none', sm: 'flex' }, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Box width='70%'>
                    <Typography variant='h2' fontWeight='bold' color='#16a4fb'>
                        facebook
                    </Typography>
                    <Typography variant='h5' sx={{ width: '100%' }}>
                        Facebook help you connect and share your life with everyone
                    </Typography>
                </Box>
            </Box>}
            {openRegister ? '' : <Box sx={{ width: { xs: '100%', sm: '40%' }, height: '100vh', paddingTop: { xs: '20px', sm: '120px' } }}>
                <form style={{ width: '100%', height: '70vh', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column', backgroundColor: 'white', padding: '20px 10px', borderRadius: '20px' }}>
                    <input type='text' style={{ width: '80%', borderRadius: '10px', outline: 'none', padding: '20px 10px', fontSize: '20px', backgroundColor: '#f3f0f0', border: 'none' }} placeholder='Email' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type='password' style={{ width: '80%', borderRadius: '10px', outline: 'none', padding: '20px 10px', fontSize: '20px', backgroundColor: '#f3f0f0', border: 'none' }} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button onClick={handleSubmitLogin} variant='outlined' sx={{ width: '60%', padding: '10px 0' }}>Login</Button>
                    <Typography variant='h6'>
                        Don't have account? <b onClick={() => setOpenRegister(true)} style={{ color: 'blue', cursor: 'pointer' }}>Register now</b>
                    </Typography>
                    <Button onClick={handleGoogleLogin} variant='outlined' sx={{ width: '80%', padding: '10px 0' }}>
                        < img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png' width={30} style={{ margin: '0 10px' }} />
                        Login with Google
                    </Button>
                </form>
            </Box>}
            {openRegister ? <Register setOpenRegister={setOpenRegister} /> : ''}
        </Box >
    )
}

export default Login