import { createSlice } from '@reduxjs/toolkit';

const SidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    isOpen: true, 
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    openSidebar: (state) => {
      state.isOpen = true;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleSidebar, openSidebar, closeSidebar } = SidebarSlice.actions;
export default SidebarSlice.reducer;