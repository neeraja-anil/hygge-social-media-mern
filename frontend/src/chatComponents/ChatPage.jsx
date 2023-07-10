import React from 'react'
import CardWrapper from '../components/CardWrapper'
import FlexBetween from '../components/FlexBetween'
import { Avatar, Box, Divider, IconButton, InputBase, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ErrorOutline, SendOutlined } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ChatPage = ({ user, chat }) => {
    const navigate = useNavigate()
    const theme = useTheme()
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
    console.log(chat)
    return (
        <CardWrapper>
            <Box
                //backgroundColor={theme.palette.primary.light}
                borderRadius='0.75rem'
                padding='0.5rem'
                minHeight='70vh'
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
                <Box>
                    <FlexBetween
                        gap='0.1rem'
                        pt='0.5rem'
                        sx={{
                            position: 'relative',
                            border: `0.5px solid ${theme.palette.neutral.light}`,
                            borderRadius: '0.75rem', p: '0.1rem'
                        }}
                    >
                        <Avatar src={user.picturePath} sx={{ width: 25, height: 25 }} />
                        <InputBase
                            placeholder='Add a comment'
                            value=''
                            onChange={(e) => console.log('first')}
                            sx={{
                                width: '100%',
                                borderRadius: '20px',
                                padding: '0.2rem 1.5rem',
                            }}
                        />
                        <IconButton >
                            <SendOutlined />
                        </IconButton>
                    </FlexBetween>
                </Box>


            </Box>
        </CardWrapper >
    )
}

export default ChatPage