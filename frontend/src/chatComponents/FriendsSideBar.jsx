import React, { useEffect, useState } from 'react'
import { Avatar, Box, CircularProgress, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CardWrapper from '../components/CardWrapper'
import FlexBetween from '../components/FlexBetween'
import { useGetFriendQuery } from '../redux/usersApiSlice'
import Friend from './Friend'
import { useGetConversationQuery } from '../redux/conversationApiSlice'


const FriendsSideBar = ({ user, changeChat }) => {
    //const { data: friends, isLoading, isError } = useGetFriendQuery(user._id)
    const theme = useTheme()
    const navigate = useNavigate()
    const isNonMobileScreens = useMediaQuery('(min-width:768px)')

    const { data: conversations } = useGetConversationQuery()
    console.log(conversations)

    const handleChatChange = (friend) => {
        changeChat(friend)
    }

    return (
        <>
            <CardWrapper sx={{ padding: '0.5rem' }}>
                {/* <Typography variant='h4'>Friends</Typography > */}
                {
                    conversations?.map(convo => (
                        <Box pt='1.1rem' key={convo._id} onClick={() => handleChatChange(convo)}>
                            <Friend conversation={convo} user={user} />
                        </Box>
                    ))
                }
            </CardWrapper >

        </>
    )
}

export default FriendsSideBar