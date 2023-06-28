import React, { useEffect } from 'react'
import { usePostsQuery } from '../redux/postApiSlice'
import { setPosts } from '../redux/postSlice'
import { useDispatch } from 'react-redux'
import { CircularProgress } from '@mui/material'
import PostsCard from './PostsCard'

const PostFeed = () => {
    const dispatch = useDispatch()
    const { data: posts, isLoading, isError } = usePostsQuery()

    return (
        <>
            {isLoading ? (
                <CircularProgress />
            ) : (
                posts.map(post => (
                    <PostsCard post={post} key={post._id} />
                ))
            )}
        </>
    )
}

export default PostFeed