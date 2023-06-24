import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    phone: null

}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        setLogout: (state, action) => {
            state.user = null
            localStorage.removeItem('user')
        },
        clearUser: (state) => {
            state.user = null
        }
    }
})

export const { setLogin, setLogout, setOtpRegister, clearUser } = authSlice.actions
export default authSlice.reducer
