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

    })
})

export const { usePostsQuery, useCreateNewPostMutation } = postApiSlice