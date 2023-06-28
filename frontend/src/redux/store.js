import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import modeReducer from './modeSlice'
import authReducer from './authSlice'
import postReducer from './postSlice'
import { apiSlice } from './apiSlice'

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        mode: modeReducer,
        auth: authReducer,
        posts: postReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store