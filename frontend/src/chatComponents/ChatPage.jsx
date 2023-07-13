import React from 'react'
import CardWrapper from '../components/CardWrapper'
import FlexBetween from '../components/FlexBetween'
import ChatInput from './ChatInput'
import MessageContainer from './MessageContainer'
import Message from './Message'
import { Avatar, Box, Divider, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ErrorOutline, SendOutlined } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ChatPage = ({ user, chat }) => {
    const navigate = useNavigate()
    const theme = useTheme()
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
    const handleSendMessage = async (msg) => {
        alert(msg)
    }
    console.log(chat)
    return (
        <>
            {isNonMobileScreens ? (
                <CardWrapper>
                    <Box
                        //backgroundColor={theme.palette.primary.light}
                        borderRadius='0.75rem'
                        padding='0.5rem'
                        minHeight='55vh'
                        maxHeight='calc(100vh - 160px)'
                        display='flex'
                        flexDirection='column'
                        justifyContent='space-between'
                    >
                        <Box>
                            <FlexBetween gap='1rem' pb='1rem'>
                                <FlexBetween gap='1rem' onClick={() => navigate(`/profile/${chat._id}`)}>
                                    <Avatar src={chat.picturePath} />
                                    <Typography sx={{ fontWeight: 'bold' }}>{chat.firstName} {chat.lastName}</Typography>
                                </FlexBetween>
                                <FlexBetween>
                                    <IconButton>
                                        <ErrorOutline />
                                    </IconButton>
                                </FlexBetween>
                            </FlexBetween>
                            <Divider />
                        </Box>
                        <MessageContainer>
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message />
                            <Message own={true} />
                            <Message own={true} />
                        </MessageContainer>
                        <Box>
                            <ChatInput user={user} handleSendMessage={handleSendMessage} />
                        </Box>
                    </Box>
                </CardWrapper >
            ) : (
                <Box
                    //backgroundColor={theme.palette.primary.light}
                    borderRadius='0.75rem'
                    padding='0.5rem'
                    minHeight='calc(100% - 200px)'
                    maxHeight='100vh'
                    display='flex'
                    flexDirection='column'
                >
                    <Box>
                        <FlexBetween gap='1rem' pb='1rem'>
                            <FlexBetween gap='1rem' onClick={() => navigate(`/profile/${chat._id}`)}>
                                <Avatar src={chat.picturePath} />
                                <Typography sx={{ fontWeight: 'bold' }}>{chat.firstName} {chat.lastName}</Typography>
                            </FlexBetween>
                            <FlexBetween>
                                <IconButton>
                                    <ErrorOutline />
                                </IconButton>
                            </FlexBetween>
                        </FlexBetween>
                        <Divider />
                    </Box>
                    <MessageContainer>
                        <Message />
                        <Message own={true} />
                        <Message />
                        <Message own={true} />
                        <Message />
                        <Message />
                        <Message own={true} />
                        <Message />
                        <Message />
                        <Message />
                        <Message own={true} />
                        <Message own={true} />
                        <Message />
                        <Message own={true} />
                    </MessageContainer>
                    <Box >
                        <ChatInput user={user} handleSendMessage={handleSendMessage} />
                    </Box>
                </Box >
            )}

        </>
    )
}

export default ChatPage