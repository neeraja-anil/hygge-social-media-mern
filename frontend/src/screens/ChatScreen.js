import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import FriendsSideBar from '../chatComponents/FriendsSideBar'
import { Box, Divider, Typography, useMediaQuery } from '@mui/material'
import WelcomePage from '../chatComponents/WelcomePage'
import ChatPage from '../chatComponents/ChatPage'
import { useSelector } from 'react-redux'
import FlexBetween from '../components/FlexBetween'
import CardWrapper from '../components/CardWrapper'

const ChatScreen = () => {
    const [currentChat, setCurrentChat] = useState(null)
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
    const { user } = useSelector(state => state.auth)
    const handleChangeChat = (chat) => {
        setCurrentChat(chat)
        console.log(chat)
    }
    return (
        <>
            <Navbar />
            {/* {isNonMobileScreens ? ( */}
            <Box
                display='flex'
                justifyContent='space-between'
                width='100%'
                gap='1rem'
                padding='1rem 5%'
            >
                <Box flexBasis={isNonMobileScreens ? '25%' : '15%'}>
                    <FriendsSideBar user={user} changeChat={handleChangeChat} />
                </Box>
                {!currentChat ? (
                    <Box flexBasis={isNonMobileScreens ? '75%' : '85%'}>
                        <WelcomePage user={user} />
                    </Box>
                ) : (
                    <Box flexBasis={isNonMobileScreens ? '75%' : '85%'}>
                        <ChatPage user={user} chat={currentChat} />
                    </Box>
                )}

            </Box >


        </>
    )
}

export default ChatScreen