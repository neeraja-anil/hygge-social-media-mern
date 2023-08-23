import React from 'react'
import CardWrapper from '../components/CardWrapper'
import { useGetFriendQuery } from '../redux/usersApiSlice'
import { Avatar, Box, CircularProgress, IconButton, Typography, useTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import FlexBetween from '../components/FlexBetween'
import { PersonAddAlt, PersonRemove } from '@mui/icons-material'
import { useAddRemoveFriendMutation } from '../redux/usersApiSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const FriendsCard = () => {
    const { user } = useSelector(state => state.auth)
    const { data: friends, isLoading, isError } = useGetFriendQuery(user?._id || '')
    const [addRemoveFriend] = useAddRemoveFriendMutation()
    const theme = useTheme()
    const navigate = useNavigate()

    const addFriendHandler = async (id) => {
        const res = await addRemoveFriend(id).unwrap()
        toast.success(res)
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
                    <Typography variant='h4'>Friends</Typography >
                    {
                        friends.map(friend => (
                            <Box pt='1.1rem' key={friend._id}>
                                <FlexBetween gap='1rem' pb='0.1rem'>
                                    <FlexBetween gap='1rem' onClick={() => navigate(`/profile/${friend._id}`)} sx={{ '&:hover': { cursor: 'pointer' } }}>
                                        <Avatar src={friend.picturePath} />
                                        <Box>
                                            <Typography>{friend.firstName} {friend.lastName}</Typography>
                                        </Box>

                                    </FlexBetween>
                                    <FlexBetween gap='1rem'>
                                        <IconButton onClick={() => addFriendHandler(friend._id)} sx={{
                                            "&:hover": {
                                                backgroundColor: theme.palette.primary.light,
                                                cursor: 'pointer'
                                            }
                                        }}>
                                            {user.friends.includes(friend._id) ? <PersonRemove /> : <PersonAddAlt />}
                                        </IconButton>
                                    </FlexBetween>
                                </FlexBetween>
                            </Box>
                        ))
                    }
                </CardWrapper >
            )}
        </>

    )
}

export default FriendsCard