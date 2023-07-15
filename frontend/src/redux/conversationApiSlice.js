import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createConversation: builder.mutation({
            query: (data) => ({
                url: '/api/conversations',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Conversations']
        }),
        getConversation: builder.query({
            query: () => ({
                url: '/api/conversations',
                method: 'GET'
            }),
            providesTags: ['Conversations']
        }),
    }),
})

export const { useCreateConversationMutation, useGetConversationQuery } = usersApiSlice