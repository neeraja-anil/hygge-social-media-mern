import React from 'react'
import CardWrapper from '../components/CardWrapper'
import FlexBetween from '../components/FlexBetween'
import { Avatar, Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useSelector } from 'react-redux'

const WelcomePage = ({ user }) => {
    const theme = useTheme()
    //const { user } = useSelector((state) => state.auth)
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)')

    return (
        <CardWrapper>
            <Box
                backgroundColor={theme.palette.primary.light}
                borderRadius='0.75rem'
                padding='0.5rem'
                minHeight='60vh'
                display='flex'
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
            >
                <Box>
                    <Avatar src={user?.picturePath} sx={{ width: isNonMobileScreens ? 100 : 50, height: isNonMobileScreens ? 100 : 50 }} />
                </Box>
                <Box pt='2rem'>
                    <Typography variant='h2'>Welcome, <font color={theme.palette.primary.dark}>{user?.firstName}{user?.lastName}</font></Typography>
                </Box>
                <Box>
                    <Typography variant='h5' sx={{ color: theme.palette.neutral.medium }}>Please select a chat to start messaging</Typography>
                </Box>

            </Box>
        </CardWrapper>
    )
}

export default WelcomePage