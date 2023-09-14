import { apiSlice } from "./apiSlice";

export const notificationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        unseenNotifications: builder.query({
            query: (userId) => ({
                url: `/api/users/${userId}/notifications/unseen`,
                method: 'GET'
            }),
            providesTags: ['Notification']
        }),
        seenNotifications: builder.query({
            query: (userId) => ({
                url: `/api/users/${userId}/notifications/seen`,
                method: 'GET'
            }),
            providesTags: ['Notification']
        }),
        markAsRead: builder.mutation({
            query: ({ userId, notificationId }) => ({
                url: `/api/users/${userId}/notifications/${notificationId}`,
                method: 'PATCH'
            }),
            invalidatesTags: ['Notification']
        }),
    }),
})

export const { useUnseenNotificationsQuery, useSeenNotificationsQuery, useMarkAsReadMutation } = notificationApiSlice