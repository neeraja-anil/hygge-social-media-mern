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
        })
    }),
})

export const { useLoginMutation, useRegistrationMutation, useVerifyRegistrationMutation } = usersApiSlice