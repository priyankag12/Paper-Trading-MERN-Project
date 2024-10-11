import { createSlice } from '@reduxjs/toolkit';

export const globalSlice = createSlice({
    name: 'global',
    initialState: { mode: 'dark' },
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        }
    },
  });

export const { setMode }  =  globalSlice.actions;
export default globalSlice.reducer;
