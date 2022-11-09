import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Box } from '@mui/material';
import { EmojiEmotions, ImageOutlined, VideoCallOutlined } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Post from './Post';
import { db } from '../firebase';
import { addDoc, collection, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'
import ProfileIntroduce from './ProfileIntroduce';
function ProfilePosts() {
    const user = useSelector(store => store.access).user.user
    // const posts = useSelector(store => store.posts).postsArr
    const [posts, setPosts] = useState([])
    const [openStatus, setOpenStatus] = useState(false)
    const [postContent, setPostContent] = useState('')
    const [imgSrc, setImgSrc] = useState('')

    useEffect(() => {
        // const q = query(collection(db, "posts"), orderBy('timestamp', 'desc'))
        // const getData = async () => {
        //     const parkingData = await getDocs(q)
        //     setPosts(parkingData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        // }
        // getData()

        const q = query(collection(db, "posts"), orderBy('timestamp', 'desc'))

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let postsArr = []
            querySnapshot.forEach((doc) => {
                postsArr.push({ ...doc.data(), id: doc.id })
            })
            setPosts(postsArr)
            // dispatch(listPosts({ postsArr }))
        })
        console.count('rerender')
        return () => unsubscribe()
    }, [])


    const handleSubmitPost = (e) => {
        e.preventDefault()
        addDoc(collection(db, 'posts'), {
            postId: uuidv4(),
            profilePic: user.photoURL,
            message: postContent,
            username: user.displayName,
            image: imgSrc,
            timestamp: Timestamp.now(),
            reactCount: 0
        })

        setPostContent('')
        setImgSrc('')
        setOpenStatus(false)
    }
    return (
        <Box sx={{ width: '80%', display: 'flex', margin: '0 auto', padding: '20px 0', justifyContent:'space-around' }}>
            <Box sx={{ width: '38%' }}>
                <ProfileIntroduce />
            </Box>
            <Box sx={{ width: '60%' }}>
                <Box sx={{ width: '100%', borderRadius: '10px', backgroundColor: '#ebe7e7' }}>
                    <Box sx={{ width: '100%', display: ' flex', justifyContent: 'space-around', alignItems: 'center', padding: '10px 5px' }}>
                        <Link to={'/profile'}>
                            <Avatar alt="" src={user?.photoURL} sx={{ cursor: 'pointer', display: { xs: 'none', sm: 'block' } }} />
                        </Link>
                        <Box onClick={() => setOpenStatus(true)} sx={{ width: { xs: '100%', sm: '90%' }, borderRadius: '50px', backgroundColor: '#fff', padding: '16px 10px', cursor: 'pointer', textAlign: { xs: 'center', sm: 'left' } }}>Hey {user?.displayName || user?.email}, What are you thinking? </Box>
                    </Box>
                    <hr />
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '10px 5px', flexWrap: 'wrap' }}>
                        <Box sx={{ display: 'flex', alignItem: 'center', cursor: 'pointer', ":hover": { backgroundColor: 'rgba(0,0,0,0.1)' }, padding: '10px', borderRadius: '10px' }}>
                            <VideoCallOutlined sx={{ color: '#f3425f' }} />
                            <Typography>
                                Live video
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItem: 'center', cursor: 'pointer', ":hover": { backgroundColor: 'rgba(0,0,0,0.1)' }, padding: '10px', borderRadius: '10px' }}>
                            <ImageOutlined sx={{ color: '#45bd62' }} />
                            <Typography>
                                Images/Videos
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItem: 'center', cursor: 'pointer', ":hover": { backgroundColor: 'rgba(0,0,0,0.1)' }, padding: '10px', borderRadius: '10px' }}>
                            <EmojiEmotions sx={{ color: '#f7b928' }} />
                            <Typography>
                                Feeling/Activity
                            </Typography>
                        </Box>
                    </Box>
                    {openStatus ?
                        <Box width='100%'>
                            <Box onClick={() => setOpenStatus(false)} sx={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 10 }}></Box>
                            <Box sx={{ width: { xs: '96%', sm: '60%' }, height: { xs: '52%', md: '60%' }, position: 'absolute', backgroundColor: 'white', top: '50%', left: '50%', translate: '-50% -50%', borderRadius: '10px', zIndex: 20 }}>
                                <Typography variant='h5' sx={{ textAlign: 'center', padding: '10px 0', fontWeight: 'bold' }}>
                                    Create new post
                                </Typography>
                                <hr />
                                <form onSubmit={handleSubmitPost} style={{ width: '100%' }}>
                                    <textarea type='text' style={{ width: '100%', outline: 'none', border: 'none', marginTop: '10px', padding: '20px 10px', fontSize: '18px' }} placeholder={`${user?.displayName || user?.email}, What are you thinking?`} value={postContent} onChange={(e) => setPostContent(e.target.value)} />

                                    <input type='text' placeholder="Image's source" style={{ width: '100%', backgroundColor: '#dfdcdc', borderRadius: '20px', padding: '20px 10px ', marginTop: '10px', fontSize: '18px', border: 'none', outline: 'none' }} value={imgSrc} onChange={(e) => setImgSrc(e.target.value)} />
                                    <Button type='submit' variant='outlined' sx={{ width: '80%', position: 'absolute', left: '50%', bottom: '10px', translate: '-50% 0' }}>
                                        Post
                                    </Button>
                                </form>
                            </Box>
                        </Box> : ''}
                </Box>
                {
                    posts.filter((post) => {
                        if (post.username == user.displayName) {
                            return post
                        }
                    }).map((post) => (
                        <Post
                            post={post}
                            key={post.id}
                            profileImg={post.profilePic}
                            image={post.image}
                            timestamp={post.timestamp}
                            username={post.username}
                            message={post.message}
                            reactCount={post.reactCount}
                        />
                    ))
                }
            </Box>
        </Box>
    )
}

export default ProfilePosts