import React, { useEffect, useState, useRef, Fragment } from 'react'
import CardWrapper from '../components/CardWrapper'
import FlexBetween from '../components/FlexBetween'
import ChatInput from './ChatInput'
import MessageContainer from './MessageContainer'
import Message from './Message'
import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ErrorOutline, SendOutlined } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useGetUserQuery } from '../redux/usersApiSlice'
import { useAddMessageMutation, useGetMessageQuery, useClearChatMutation } from '../redux/messageApiSlice'

const ChatPage = ({ user, chat, socket }) => {
    const [messages, setMessages] = useState([])
    const [arrivalMsg, setArrivalMsg] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()
    const theme = useTheme()
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
    const scrollRef = useRef()
    const [addMessage] = useAddMessageMutation()
    const [clearChat] = useClearChatMutation()
    const conversationId = chat._id
    const sender = user._id
    const friendId = chat?.members?.find(friend => friend !== user._id)
    const { data: friend } = useGetUserQuery(friendId)
    const { data: texts } = useGetMessageQuery(conversationId)


    const handleSendMessage = async (msg) => {
        socket.current.emit('sendMessage', {
            senderId: sender,
            recieverId: friendId,
            text: msg
        })
        const res = await addMessage({ conversationId, sender, text: msg }).unwrap()
    }

    const handleClick = e => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClearChat = async () => {
        const res = await clearChat(conversationId).unwrap()
    }

    useEffect(() => {
        socket.current.on('getMessage', data => {
            setArrivalMsg({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        if (texts) {
            setMessages(texts)
        }
    }, [texts])

    useEffect(() => {
        arrivalMsg && chat?.members.includes(arrivalMsg.sender) &&
            setMessages(prev => [...prev, arrivalMsg])
    }, [arrivalMsg, chat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages])


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
                                <FlexBetween gap='1rem' onClick={() => navigate(`/profile/${friend?._id}`)}>
                                    <Avatar src={friend?.picturePath} />
                                    <Typography sx={{ fontWeight: 'bold' }}>{friend?.firstName} {friend?.lastName}</Typography>
                                </FlexBetween>
                                <FlexBetween>
                                    <IconButton onClick={handleClick}>
                                        <ErrorOutline />
                                    </IconButton>
                                </FlexBetween>
                            </FlexBetween>
                            <Divider />
                        </Box>
                        <MessageContainer >
                            {messages && messages.length !== 0 && messages.map(msg => (
                                <div key={msg._id} ref={scrollRef}>
                                    <Message message={msg} own={msg.sender === user._id} />
                                </div>
                            ))}
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
                            <FlexBetween gap='1rem' onClick={() => navigate(`/profile/${friend._id}`)}>
                                <Avatar src={friend.picturePath} />
                                <Typography sx={{ fontWeight: 'bold' }}>{friend.firstName} {friend.lastName}</Typography>
                            </FlexBetween>
                            <FlexBetween>
                                <IconButton onClick={handleClick}>
                                    <ErrorOutline />
                                </IconButton>
                            </FlexBetween>
                        </FlexBetween>
                        <Divider />
                    </Box>
                    <MessageContainer>
                        {messages?.map(msg => (
                            <div ref={scrollRef}>
                                <Message message={msg} own={msg.sender === user._id} />
                            </div>
                        ))}
                    </MessageContainer>
                    <Box >
                        <ChatInput user={user} handleSendMessage={handleSendMessage} />
                    </Box>
                </Box >
            )}
            {/* NOTIFICATION MENU */}
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClearChat}>Clear Chat</MenuItem>
            </Menu>
        </>
    )
}

export default ChatPage