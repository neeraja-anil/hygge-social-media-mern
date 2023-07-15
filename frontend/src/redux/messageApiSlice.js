import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addMessage: builder.mutation({
            query: (data) => ({
                url: '/api/messages',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Messages']
        }),
        getMessage: builder.query({
            query: (conversationId) => ({
                url: `/api/messages/${conversationId}`,
                method: 'GET'
            }),
            providesTags: ['Messages']
        }),
    }),
})

export const { useAddMessageMutation, useGetMessageQuery } = usersApiSlice