import React, { useEffect, useState } from 'react'
import { Avatar, Box, CircularProgress, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CardWrapper from '../components/CardWrapper'
import FlexBetween from '../components/FlexBetween'
import MessageContainer from './MessageContainer'
import { useGetFriendQuery } from '../redux/usersApiSlice'
import Friend from './Friend'
import { useGetConversationQuery } from '../redux/conversationApiSlice'


const ConversationsSideBar = ({ user, changeChat }) => {
    //const { data: friends, isLoading, isError } = useGetFriendQuery(user._id)
    const theme = useTheme()
    const navigate = useNavigate()
    const isNonMobileScreens = useMediaQuery('(min-width:768px)')

    const { data: conversations } = useGetConversationQuery()

    const handleChatChange = (friend) => {
        changeChat(friend)
    }
    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate])

    return (
        <>
            <MessageContainer sx={{ padding: '0.5rem', backgroundColor: theme.palette.background.alt, height: 'fit-content', maxHeight: '30vh' }} >
                <Typography variant={isNonMobileScreens ? 'h4' : 'h6'}>Chats</Typography >
                {
                    conversations?.map(convo => (
                        <Box pt={isNonMobileScreens && '0.5rem'} key={convo._id} onClick={() => handleChatChange(convo)}>
                            <Friend conversation={convo} user={user} />
                        </Box>
                    ))
                }
            </MessageContainer >

        </>
    )
}

export default ConversationsSideBar