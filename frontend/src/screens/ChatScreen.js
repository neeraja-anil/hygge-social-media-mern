import React from 'react'
import Navbar from '../components/Navbar'
import FriendsSideBar from '../chatComponents/FriendsSideBar'
import { Box, useMediaQuery } from '@mui/material'
import WelcomePage from '../chatComponents/WelcomePage'

const ChatScreen = () => {
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
    return (
        <>
            <Navbar />
            <Box
                display={isNonMobileScreens ? 'flex' : 'block'}
                justifyContent='space-between'
                width='100%'
                gap='1rem'
                padding='2rem 5%'
            >
                <Box flexBasis={isNonMobileScreens ? '25%' : ''}>
                    <FriendsSideBar />
                </Box>
                <Box flexBasis={isNonMobileScreens ? '75%' : ''}>
                    <WelcomePage />
                </Box>
            </Box>
        </>
    )
}

export default ChatScreen