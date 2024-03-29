import React, { useEffect } from 'react'
import { Avatar, Box, useTheme, Typography, useMediaQuery } from '@mui/material'
import FlexBetween from '../components/FlexBetween'
import { useGetUserQuery } from '../redux/usersApiSlice'
import { useNavigate } from 'react-router-dom'

const Friend = ({ conversation, user }) => {
    const isNonMobileScreens = useMediaQuery('(min-width:768px)')
    const theme = useTheme()
    const navigate = useNavigate()
    const friendId = conversation?.members?.find(friend => friend !== user._id)
    const { data: friend } = useGetUserQuery(friendId)

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    })

    return (
        <>
            {isNonMobileScreens ? (
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
                            <Avatar src={friend?.picturePath} />
                            <Box>
                                <Typography>{friend?.firstName} {friend?.lastName}</Typography>
                            </Box>
                        </FlexBetween>
                    </FlexBetween>
                </Box>
            ) : (
                <Box backgroundColor={theme.palette.primary.light}
                    borderRadius='0.75rem'
                    padding='0.5rem'
                    sx={{
                        '&:hover': {
                            backgroundColor: theme.palette.primary.main,
                            opacity: [0.9, 0.8, 0.7],
                        },
                    }}
                >
                    <Avatar src={friend?.picturePath} sx={{ height: 25, width: 25 }} />
                </Box>
            )}
        </>
    )
}

export default Friend