import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null, 
    },
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload; 
        },
        clearUser: (state) => {
            state.userInfo = null; 
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;