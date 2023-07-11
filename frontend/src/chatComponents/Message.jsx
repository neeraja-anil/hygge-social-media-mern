import React from 'react'
import CardWrapper from '../components/CardWrapper'
import { Typography, Box, useTheme } from '@mui/material'

const Message = ({ own }) => {
    const theme = useTheme()
    return (
        <Box display='flex' flexDirection='column' alignItems={own && 'flex-end'}>
            <CardWrapper sx={{ backgroundColor: own ? '#E6FBFF' : '#006B7D', maxWidth: '350px' }} >
                <Box alignItems='flex-end'>
                    <Typography sx={{ color: 'black' }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. !</Typography>
                </Box>
            </CardWrapper >
        </Box>

    )
}

export default Message