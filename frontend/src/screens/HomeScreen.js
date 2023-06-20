import { Box, useMediaQuery } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProfileCard from '../homeCards/ProfileCard';

const HomeScreen = () => {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)')

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate])

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
            </Box>

        </Box>
    )
}

export default HomeScreen