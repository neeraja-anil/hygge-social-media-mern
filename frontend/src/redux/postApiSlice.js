import { apiSlice } from "./apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createNewPost: builder.mutation({
            query: (data) => ({
                url: '/api/posts/create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Post']
        }),
        posts: builder.query({
            query: () => ({
                url: '/api/posts',
                method: 'GET',
            }),
            providesTags: ['Post']
        }),
        likePost: builder.mutation({
            query: (postId) => ({
                url: `/api/posts/${postId}/like`,
                method: 'PUT',
            }),
            invalidatesTags: ['Post']
        }),

    })
})

export const { usePostsQuery, useCreateNewPostMutation, useLikePostMutation } = postApiSlice