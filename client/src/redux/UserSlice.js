import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const loadUserInfoFromCookies = () => {
    const userInfo = Cookies.get('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
};

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: loadUserInfoFromCookies(), 
    },
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload; 
            Cookies.set('userInfo', JSON.stringify(action.payload), { expires: 1 });
        },
        clearUser: (state) => {
            state.userInfo = null; 
            Cookies.remove('userInfo');
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUserInfo = (state) => state.user.userInfo;
export default userSlice.reducer;