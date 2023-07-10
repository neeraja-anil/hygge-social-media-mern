import React from 'react'
import { Avatar, Box, CircularProgress, IconButton, Typography, useTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CardWrapper from '../components/CardWrapper'
import FlexBetween from '../components/FlexBetween'
import { useGetFriendQuery } from '../redux/usersApiSlice'


const FriendsSideBar = ({ user, changeChat }) => {
    const { data: friends, isLoading, isError } = useGetFriendQuery(user._id)
    const theme = useTheme()
    const navigate = useNavigate()

    const handleChatChange = (friend) => {
        changeChat(friend)
    }

    return (
        <>
            {isLoading ? (
                <CircularProgress />
            ) : isError ? (
                <CardWrapper>
                    <Typography variant='h4'>Friends</Typography>
                    <Typography sx={{ color: theme.palette.neutral.medium }}>Cannot load friends details.try again</Typography>
                </CardWrapper>
            ) : (
                <CardWrapper>
                    {/* <Typography variant='h4'>Friends</Typography > */}
                    {
                        friends.map(friend => (
                            <Box pt='1.1rem' key={friend._id}>
                                <Box
                                    onClick={() => handleChatChange(friend)}
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
                                            <Avatar src={friend.picturePath} />
                                            <Box>
                                                <Typography>{friend.firstName} {friend.lastName}</Typography>
                                            </Box>
                                        </FlexBetween>
                                    </FlexBetween>
                                </Box>
                            </Box>
                        ))
                    }
                </CardWrapper >
            )}
        </>
    )
}

export default FriendsSideBar