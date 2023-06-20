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
        setOtpRegister: (state, action) => {
            state.phone = action.payload
        },
        clearPhone: (state) => {
            state.phone = null
        }
    }
})

export const { setLogin, setLogout, setOtpRegister, clearPhone } = authSlice.actions
export default authSlice.reducer
