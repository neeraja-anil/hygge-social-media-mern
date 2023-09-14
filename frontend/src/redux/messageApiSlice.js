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
        clearChat: builder.mutation({
            query: (conversationId) => ({
                url: `/api/messages/delete/${conversationId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Messages']
        }),
    }),
})

export const { useAddMessageMutation, useGetMessageQuery, useClearChatMutation } = usersApiSlice