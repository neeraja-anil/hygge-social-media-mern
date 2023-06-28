import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload
            state.token = action.payload.token
            localStorage.setItem('user', JSON.stringify(action.payload))
            localStorage.setItem('token', JSON.stringify(action.payload.token))
        },
        setLogout: (state, action) => {
            state.user = null
            localStorage.removeItem('user')
        },
        setUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        clearUser: (state) => {
            state.user = null
        }
    }
})

export const { setLogin, setLogout, setOtpRegister, setUser, clearUser } = authSlice.actions
export default authSlice.reducer
