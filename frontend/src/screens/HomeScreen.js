import { Box, useMediaQuery } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetUserQuery } from '../redux/usersApiSlice';
import { setUser } from '../redux/authSlice';
import Navbar from '../components/Navbar';
import ProfileCard from '../homeCards/ProfileCard';
import CreatePostCard from '../homeCards/CreatePostCard';
import PostsCard from '../homeCards/PostsCard';
import PostFeed from '../homeCards/PostFeed';
import FriendsCard from '../homeCards/FriendsCard';
import AdsCard from '../homeCards/AdsCard';

const HomeScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { data: userInfo, isLoading, error } = useGetUserQuery(user._id)

    const isNonMobileScreens = useMediaQuery('(min-width:1000px)')

    useEffect(() => {
        if (!user) {
            navigate('/')
        } else {
            userInfo && dispatch(setUser(userInfo))
        }
    }, [user, userInfo, navigate, dispatch])

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
                    <ProfileCard />
                </Box>
                <Box flexBasis={isNonMobileScreens ? '50%' : ''} mt={isNonMobileScreens ? '' : '2rem'}>
                    <CreatePostCard />
                    <Box gap='1rem' padding='1rem 0'>
                        <PostFeed />
                    </Box>
                </Box>
                <Box flexBasis={isNonMobileScreens ? '25%' : ''}>
                    <AdsCard />
                    <Box gap='1rem' padding='1rem 0' sx={isNonMobileScreens && { position: 'sticky', top: '96px' }}>
                        <FriendsCard />
                    </Box>

                </Box>
            </Box>

        </Box >
    )
}

export default HomeScreen