import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import ConversationsSideBar from '../chatComponents/ConversationsSideBar'
import { Box, useMediaQuery } from '@mui/material'
import WelcomePage from '../chatComponents/WelcomePage'
import ChatPage from '../chatComponents/ChatPage'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import UserFriendsSidebar from '../chatComponents/UserFriendsSidebar'

const ChatScreen = () => {
    const [currentChat, setCurrentChat] = useState(null)
    const socket = useRef()
    const navigate = useNavigate()
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
    const { user } = useSelector(state => state.auth)

    const handleChangeChat = async (chat) => {
        setCurrentChat(chat)
    }

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
        socket.current = io(('http://localhost:5001'))
    }, [])

    useEffect(() => {
        socket?.current.emit('addUser', user._id)
        socket?.current.on('getUsers', users => {
            console.log(users)
        })
        //Clean up the socket connection when the component unmounts
        return () => {
            socket?.current.disconnect();
        };
    }, [user])

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
                    <ConversationsSideBar user={user} changeChat={handleChangeChat} />
                    <Box gap='1rem' padding='1rem 0'>
                        <UserFriendsSidebar user={user} newChat={handleChangeChat} />
                    </Box>
                </Box>
                {!currentChat ? (
                    <Box flexBasis={isNonMobileScreens ? '75%' : '85%'}>
                        <WelcomePage user={user} />
                    </Box>
                ) : (
                    <Box flexBasis={isNonMobileScreens ? '75%' : '85%'}>
                        <ChatPage user={user} chat={currentChat} socket={socket} />
                    </Box>
                )}

            </Box >
        </>
    )
}

export default ChatScreen