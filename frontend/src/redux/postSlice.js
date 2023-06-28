import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts')) : '',
}

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
            localStorage.setItem('posts', JSON.stringify(action.payload))
        }
    }
})

export const { setPosts } = postSlice.actions
export default postSlice.reducer