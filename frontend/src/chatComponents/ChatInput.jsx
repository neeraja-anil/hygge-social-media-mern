import React, { useState } from 'react'
import FlexBetween from '../components/FlexBetween'
import EmojiPicker from 'emoji-picker-react'
import { Avatar, IconButton, InputBase, useTheme, Box } from '@mui/material'
import { InsertEmoticon, SendOutlined } from '@mui/icons-material'

const ChatInput = ({ handleSendMessage }) => {
    const [showPicker, setShowPicker] = useState(false)
    const [msg, setMsg] = useState('')
    const theme = useTheme()

    const handleShowEmojiPicker = () => {
        setShowPicker(!showPicker)
    }
    const handleEmojiClick = (emoji) => {
        let message = msg
        message += emoji.emoji
        setMsg(message)
    }
    const handleChatSend = (e) => {
        e.preventDefault()
        handleSendMessage(msg)
        setMsg('')
    }

    return (
        <>
            <Box>
                {showPicker && <EmojiPicker onEmojiClick={handleEmojiClick} height='300px' width='300px' previewConfig={{ showPreview: false }} />}
            </Box>
            <FlexBetween
                gap='0.1rem'
                pt='0.5rem'
                sx={{
                    position: 'relative',
                    border: `0.5px solid ${theme.palette.neutral.light}`,
                    borderRadius: '0.75rem', p: '0.1rem'
                }}
            >
                <Box>
                    <InsertEmoticon onClick={handleShowEmojiPicker} />
                </Box>
                <InputBase
                    placeholder='Message'
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    sx={{
                        width: '100%',
                        borderRadius: '20px',
                        padding: '0.2rem 1.5rem',
                    }}
                />
                <IconButton onClick={handleChatSend}>
                    <SendOutlined />
                </IconButton>
            </FlexBetween>
        </>
    )
}

export default ChatInput