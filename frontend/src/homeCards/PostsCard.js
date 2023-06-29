import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, useTheme, Avatar, useMediaQuery, CircularProgress, IconButton, Divider } from '@mui/material'
import { Chat, Favorite, FavoriteBorder, PersonAddAlt, PersonRemove } from '@mui/icons-material'
import { useAddRemoveFriendMutation } from '../redux/usersApiSlice'
import { useLikePostMutation } from '../redux/postApiSlice'
import { useGetUserQuery } from '../redux/usersApiSlice'
import { setUser } from '../redux/authSlice';
import CardWrapper from '../components/CardWrapper'
import FlexBetween from '../components/FlexBetween'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const PostsCard = ({ post }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

    // date of postCreated
    const date = moment(post.createdAt).format('YYYY-MM-DD')
    const postCreated = moment(date).fromNow()

    const theme = useTheme()
    const medium = theme.palette.neutral.medium
    const isMobileScreens = useMediaQuery('(max-width:900px)')

    // REDUX APIS
    const { data: userInfo, error } = useGetUserQuery(user._id)
    const [addRemoveFriend] = useAddRemoveFriendMutation()
    const [likePost, { isLoading }] = useLikePostMutation()

    const addFriendHandler = async () => {
        const id = post.user
        const res = await addRemoveFriend(id).unwrap()
        dispatch(setUser(userInfo))
        toast.success(res)
    }

    const postLikeHandler = async () => {
        const postId = post._id
        const res = await likePost(postId).unwrap()
        toast.success(res)
    }

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate])

    return (
        <Box padding='0.2rem 0'>
            <CardWrapper>
                <FlexBetween gap='1rem' pb='1.1rem'>
                    <FlexBetween gap='1rem'>
                        <Avatar src={post.picturePath} />
                        <Box>
                            <Typography>{post.firstName} {post.lastName}</Typography>
                            <Typography color={medium}>{postCreated}</Typography>
                        </Box>

                    </FlexBetween>
                    <FlexBetween gap='1rem'>
                        <IconButton onClick={addFriendHandler}>
                            {user.friends.includes(post.user) ? <PersonRemove /> : <PersonAddAlt />}
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>
                <Box>
                    <Typography>{post.description}</Typography>
                    <Box
                        component="img"
                        alt="cannot load image.retry"
                        src={post.postPath}
                        sx={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '0.5rem'
                        }}
                    />
                </Box>
                <Divider />
                <FlexBetween gap='1rem'>
                    <FlexBetween gap='2rem'>
                        <FlexBetween>
                            <IconButton onClick={postLikeHandler}>
                                {post.likes.includes(user._id) ? <Favorite sx={{ color: '#991818' }} /> : <FavoriteBorder />}
                            </IconButton>
                            <Typography>Like</Typography>
                        </FlexBetween>
                        <FlexBetween>
                            <IconButton>
                                <Chat></Chat>
                            </IconButton>
                            <Typography>Comment</Typography>
                        </FlexBetween>
                    </FlexBetween>
                </FlexBetween>
            </CardWrapper>
        </Box>

    )
}

export default PostsCard