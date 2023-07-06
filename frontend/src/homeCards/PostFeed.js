import React from 'react'
import { usePostsQuery } from '../redux/postApiSlice'
import { CircularProgress, Typography, useTheme } from '@mui/material'
import PostsCard from './PostsCard'

const PostFeed = () => {
    const { data: posts, isLoading, isError } = usePostsQuery()
    const theme = useTheme()
    return (
        <>
            {isLoading ? (
                <CircularProgress />
            ) : isError ? (
                <Typography sx={{ color: theme.palette.neutral.medium }}>Something Went Wrong</Typography>
            ) : (
                posts.map(post => (
                    <PostsCard post={post} key={post._id} />
                ))
            )}
        </>
    )
}

export default PostFeed