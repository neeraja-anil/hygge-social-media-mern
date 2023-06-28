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
            })
        })
    }),
})

export const { useLoginMutation, useRegistrationMutation, useVerifyRegistrationMutation, useGetUserQuery } = usersApiSlice