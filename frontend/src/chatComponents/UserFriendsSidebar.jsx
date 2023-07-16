import React, { useEffect, useState } from 'react'
import { Avatar, Box, CircularProgress, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CardWrapper from '../components/CardWrapper'
import FlexBetween from '../components/FlexBetween'
import { useCreateConversationMutation, useGetConversationQuery } from '../redux/conversationApiSlice'
import { useGetFriendQuery } from '../redux/usersApiSlice'
import MessageContainer from './MessageContainer'

const UserFriendsSidebar = ({ user, newChat }) => {
    const { data: friends, isLoading, isError } = useGetFriendQuery(user._id)
    const [createConversation, error] = useCreateConversationMutation()
    const theme = useTheme()
    const navigate = useNavigate()
    const isNonMobileScreens = useMediaQuery('(min-width:768px)')

    const handleChatChange = async (friend) => {
        const recieverId = friend._id
        const { data } = await createConversation({ recieverId })
        newChat(data.conversation)
    }

    return (
        <>
            {isNonMobileScreens ? (
                <MessageContainer sx={{ padding: '0.5rem', backgroundColor: theme.palette.background.alt, maxHeight: '40vh' }}>
                    <Typography variant='h4'>Friends</Typography >
                    {
                        friends?.map(f => (
                            <Box pt='0.5rem' key={f._id} onClick={() => handleChatChange(f)}>
                                <Box
                                    backgroundColor={theme.palette.primary.light}
                                    borderRadius='0.75rem'
                                    padding='0.5rem'
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: theme.palette.primary.main,
                                            opacity: [0.9, 0.8, 0.7],
                                        },
                                    }}
                                >
                                    <FlexBetween gap='1rem' pb='0.1rem'>
                                        <FlexBetween gap='1rem' sx={{ '&:hover': { cursor: 'pointer' } }}>
                                            <Avatar src={f?.picturePath} />
                                            <Box>
                                                <Typography>{f?.firstName} {f?.lastName}</Typography>
                                            </Box>
                                        </FlexBetween>
                                    </FlexBetween>
                                </Box>
                            </Box>
                        ))
                    }
                </MessageContainer >
            ) : (
                <MessageContainer sx={{ padding: '0.5rem', backgroundColor: theme.palette.background.alt, maxHeight: '40vh' }}>
                    <Typography variant='h6'>Friends</Typography>
                    {friends.map(f => (
                        <Box backgroundColor={theme.palette.primary.light}
                            borderRadius='0.75rem'
                            padding='0.5rem'
                            sx={{
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.main,
                                    opacity: [0.9, 0.8, 0.7],
                                },
                            }}>
                            <Avatar src={f.picturePath} sx={{ width: 25, height: 25 }} />
                        </Box>
                    ))}
                </MessageContainer>

            )}


        </>
    )
}

export default UserFriendsSidebar