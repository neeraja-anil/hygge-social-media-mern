import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/api/auth/users/login',
                method: 'POST',
                body: data,
            }),
        }),
        registration: builder.mutation({
            query: (data) => ({
                url: '/api/auth/users',
                method: 'POST',
                body: data,
            }),
        }),
        verifyRegistration: builder.mutation({
            query: (data) => ({
                url: '/api/auth/users/verify',
                method: 'POST',
                body: data,
            }),
        }),
        getUser: builder.query({
            query: (userId) => ({
                url: `/api/users/${userId}`,
                method: 'GET',
            }),
            providesTags: ['User']
        }),
        addRemoveFriend: builder.mutation({
            query: (friendId) => ({
                url: `/api/users/${friendId}/addfriend`,
                method: 'PUT',
            }),
            invalidatesTags: ['User']
        }),
        getFriend: builder.query({
            query: (id) => ({
                url: `/api/users/${id}/friends`,
                method: 'GET',
            }),
            providesTags: ['User']
        }),
        editUser: builder.mutation({
            query: (formData) => ({
                url: `/api/users/profile/edit`,
                method: 'PUT',
                body: formData
            }),
            invalidatesTags: ['User']
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: `/api/users/changePassword`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['User']
        }),
        unseenNotifications: builder.query({
            query: (userId) => ({
                url: `/api/users/${userId}/notifications/unseen`,
                method: 'GET'
            }),
            invalidatesTags: ['User']
        }),
        seenNotifications: builder.query({
            query: (userId) => ({
                url: `/api/users/${userId}/notifications/seen`,
                method: 'GET'
            }),
            invalidatesTags: ['User']
        }),
        markAsRead: builder.mutation({
            query: ({ userId, notificationId }) => ({
                url: `/api/users/${userId}/notifications/${notificationId}`,
                method: 'GET'
            }),
            invalidatesTags: ['User']
        }),
    }),
})

export const { useLoginMutation, useRegistrationMutation, useVerifyRegistrationMutation, useGetUserQuery, useAddRemoveFriendMutation, useGetFriendQuery, useEditUserMutation, useChangePasswordMutation, useUnseenNotificationsQuery, useSeenNotificationsQuery, useMarkAsReadMutation } = usersApiSlice