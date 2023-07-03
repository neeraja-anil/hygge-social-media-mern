import React from 'react'
import CardWrapper from '../components/CardWrapper'
import { useGetFriendQuery } from '../redux/usersApiSlice'
import { Avatar, Box, CircularProgress, IconButton, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import FlexBetween from '../components/FlexBetween'
import { PersonAddAlt, PersonRemove } from '@mui/icons-material'
import { useAddRemoveFriendMutation } from '../redux/usersApiSlice'
import { toast } from 'react-toastify'

const FriendsCard = () => {
    const { user } = useSelector(state => state.auth)
    const { data: friends, isLoading, isError } = useGetFriendQuery(user._id)
    const [addRemoveFriend] = useAddRemoveFriendMutation()

    const addFriendHandler = async (id) => {
        const res = await addRemoveFriend(id).unwrap()
        toast.success(res)
    }

    return (
        <>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <CardWrapper sx={{ position: "fixed" }}>
                    <Typography variant='h4'>Friends</Typography>
                    {friends.map(friend => (
                        <Box pt='1.1rem'>
                            <FlexBetween gap='1rem' pb='0.1rem'>
                                <FlexBetween gap='1rem'>
                                    <Avatar src={friend.picturePath} />
                                    <Box>
                                        <Typography>{friend.firstName} {friend.lastName}</Typography>
                                    </Box>

                                </FlexBetween>
                                <FlexBetween gap='1rem'>
                                    <IconButton onClick={() => addFriendHandler(friend._id)}>
                                        {user.friends.includes(friend._id) ? <PersonRemove /> : <PersonAddAlt />}
                                    </IconButton>
                                </FlexBetween>
                            </FlexBetween>
                        </Box>
                    ))}
                </CardWrapper>
            )}
        </>

    )
}

export default FriendsCard