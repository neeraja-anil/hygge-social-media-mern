import { Box, useMediaQuery } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../redux/usersApiSlice';
import { setUser } from '../redux/authSlice';
import Navbar from '../components/Navbar';
import ProfileCard from '../homeCards/ProfileCard';
import CreatePostCard from '../homeCards/CreatePostCard';
import PostFeed from '../homeCards/PostFeed';
import FriendsCard from '../homeCards/FriendsCard';
import AdsCard from '../homeCards/AdsCard';
import { io } from 'socket.io-client'


const HomeScreen = () => {
    const socket = useRef()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { data: userInfo } = useGetUserQuery(user?._id || '')

    const isNonMobileScreens = useMediaQuery('(min-width:1000px)')

    useEffect(() => {
        if (!user) {
            navigate('/')
        } else {
            userInfo && dispatch(setUser(userInfo))
        }
    }, [user, userInfo, navigate, dispatch])

    // NOTIFICATION 
    useEffect(() => {
        if (!user) {
            navigate('/')
        }
        socket.current = io(('http://localhost:5001'))
    }, [])

    useEffect(() => {
        socket?.current.emit('addUser', user?._id)
        socket?.current.on('getUsers', users => {
            console.log(users)
        })
        //Clean up the socket connection when the component unmounts 
        return () => {
            socket?.current.disconnect();
        };
    }, [user])

    return (
        <Box>
            <Navbar />
            <Box
                display={isNonMobileScreens ? 'flex' : 'block'}
                justifyContent='space-between'
                width='100%'
                gap='1rem'
                padding='2rem 5%'
            >
                <Box flexBasis={isNonMobileScreens ? '25%' : ''}>
                    <Box sx={{ position: 'sticky', top: '96px' }}>
                        <ProfileCard />
                    </Box>

                </Box>
                <Box flexBasis={isNonMobileScreens ? '50%' : ''} mt={isNonMobileScreens ? '' : '2rem'}>
                    <CreatePostCard />
                    <Box gap='1rem' padding='1rem 0'>
                        <PostFeed />
                    </Box>
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis={isNonMobileScreens ? '25%' : ''}>
                        <AdsCard />
                        <Box gap='1rem' padding='1rem 0' sx={{ position: 'sticky', top: '96px' }}>
                            <FriendsCard />
                        </Box>

                    </Box>
                )}

            </Box>

        </Box >
    )
}

export default HomeScreen