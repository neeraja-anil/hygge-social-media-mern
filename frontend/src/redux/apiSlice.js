import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001' }),
    //tagTypes: ['user'],
    endpoints: (builder) => ({})
})