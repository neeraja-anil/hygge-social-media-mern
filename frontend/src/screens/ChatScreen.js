import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import FriendsSideBar from '../chatComponents/FriendsSideBar'
import { Box, useMediaQuery } from '@mui/material'
import WelcomePage from '../chatComponents/WelcomePage'
import ChatPage from '../chatComponents/ChatPage'
import { useSelector } from 'react-redux'

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
            <Box
                display={isNonMobileScreens ? 'flex' : 'block'}
                justifyContent='space-between'
                width='100%'
                gap='1rem'
                padding='2rem 5%'
            >
                <Box flexBasis={isNonMobileScreens ? '25%' : ''}>
                    <FriendsSideBar user={user} changeChat={handleChangeChat} />
                </Box>
                {!currentChat ? (
                    <Box flexBasis={isNonMobileScreens ? '75%' : ''}>
                        <WelcomePage user={user} />
                    </Box>
                ) : (
                    <Box flexBasis={isNonMobileScreens ? '75%' : ''}>
                        <ChatPage user={user} chat={currentChat} />
                    </Box>
                )}

            </Box>
        </>
    )
}

export default ChatScreen