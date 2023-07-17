import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, useTheme, Avatar, IconButton, Divider, InputBase } from '@mui/material'
import { Chat, Favorite, FavoriteBorder, MoreVert, PersonAddAlt, PersonRemove, SendOutlined } from '@mui/icons-material'
import { useAddRemoveFriendMutation } from '../redux/usersApiSlice'
import { useLikePostMutation, useCommentPostMutation } from '../redux/postApiSlice'
import { useGetUserQuery } from '../redux/usersApiSlice'
import { setUser } from '../redux/authSlice';
import CardWrapper from '../components/CardWrapper'
import FlexBetween from '../components/FlexBetween'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const PostsCard = ({ post }) => {
    const [comment, setComment] = useState('')
    const [isComment, setIsComment] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

    // date of postCreated
    const date = moment(post.createdAt).format('YYYY-MM-DD')
    const postCreated = moment(date).fromNow()

    const theme = useTheme()
    const medium = theme.palette.neutral.medium
    const neutralLight = theme.palette.neutral.light
    const primaryLight = theme.palette.primary.light

    // REDUX APIS
    const { data: userInfo, error } = useGetUserQuery(user._id)
    const [addRemoveFriend] = useAddRemoveFriendMutation()
    const [likePost, { isLoading }] = useLikePostMutation()
    const [commentPost] = useCommentPostMutation()

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
    const addCommentHandler = async () => {
        const postId = post._id
        const res = await commentPost({ comment, postId }).unwrap()
        console.log(res)
        setComment('')
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
                    <FlexBetween gap='1rem' onClick={() => navigate(`/profile/${post.user}`)} sx={{ '&:hover': { cursor: 'pointer' } }}>
                        <Avatar src={post.picturePath} />
                        <Box >
                            <Typography>{post.firstName} {post.lastName}</Typography>
                            <Typography color={medium}>{postCreated}</Typography>
                        </Box>

                    </FlexBetween>
                    <FlexBetween gap='1rem'>
                        <IconButton onClick={addFriendHandler} sx={{
                            "&:hover": {
                                backgroundColor: primaryLight,
                                cursor: 'pointer'
                            }
                        }}>
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
                <FlexBetween gap='1rem'>
                    {post.likes.length !== 0 && (
                        <FlexBetween gap='0.1rem'>
                            <FavoriteBorder sx={{ color: '#991818', fontSize: '12px' }} />
                            <Typography color={medium} sx={{ fontSize: '12px' }}>{post.likes.length}</Typography>
                        </FlexBetween>
                    )}
                </FlexBetween>

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
                            <IconButton onClick={() => setIsComment(!isComment)}>
                                <Chat></Chat>
                            </IconButton>
                            <Typography>Comment</Typography>
                        </FlexBetween>
                    </FlexBetween>
                </FlexBetween>
                {isComment && (
                    <>
                        <FlexBetween gap='1rem' pt='0.5rem'>
                            <Avatar src={user.picturePath} sx={{ width: 25, height: 25 }} />
                            <InputBase
                                placeholder='Add a comment'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                sx={{
                                    width: '100%',
                                    borderRadius: '20px',
                                    padding: '0.2rem 1.5rem',
                                    backgroundColor: neutralLight
                                }}
                            />
                            <IconButton onClick={addCommentHandler}>
                                <SendOutlined />
                            </IconButton>
                        </FlexBetween>
                        {post.comments.map(comment => (
                            <Box padding='0.2rem 0' pt='1.1rem' key={comment._id}>
                                <FlexBetween gap='1rem'>
                                    <Avatar src={comment.picturePath} sx={{ width: 25, height: 25 }} />

                                    <Box padding='0.5rem' backgroundColor={neutralLight} borderRadius='10px' sx={{ width: '100%' }}>
                                        <FlexBetween gap='1rem' onClick={() => navigate(`/profile/${comment.user}`)}>
                                            <FlexBetween>
                                                <Typography fontWeight='600'>{comment.firstName} {comment.lastName}</Typography>
                                            </FlexBetween>
                                            <FlexBetween>
                                                <Typography sx={{ fontSize: '12px', color: medium }}>
                                                    {moment(comment.createdAt).fromNow()}
                                                </Typography>
                                                <IconButton>
                                                    <MoreVert />
                                                </IconButton>
                                            </FlexBetween>

                                        </FlexBetween>
                                        <FlexBetween>
                                            <Typography>{comment.comment}</Typography>
                                        </FlexBetween>
                                    </Box>


                                </FlexBetween>

                            </Box>

                        ))}
                    </>
                )}

            </CardWrapper>
        </Box>

    )
}

export default PostsCard