import React from 'react'
import CardWrapper from '../components/CardWrapper'
import { Typography, Box, useTheme } from '@mui/material'

const Message = ({ own }) => {
    const theme = useTheme()
    return (
        <Box display='flex' flexDirection='column' alignItems={own && 'flex-end'} p='0.1rem'>
            <CardWrapper sx={{ backgroundColor: own ? '#E6FBFF' : '#006B7D', maxWidth: '300px' }} >
                <Box>
                    <Typography sx={{ color: 'black' }}>lorem</Typography>
                </Box>
            </CardWrapper >
        </Box>

    )
}

export default Message