import { createSlice } from '@reduxjs/toolkit';

const MobileMenuSlice = createSlice({
  name: 'mobileMenu',
  initialState: { isMobileMenuOpen: false },
  reducers: {
    toggleMobileMenu: (state) => { state.isMobileMenuOpen = !state.isMobileMenuOpen; },
    openMobileMenu: (state) => { state.isMobileMenuOpen = true; },
    closeMobileMenu: (state) => { state.isMobileMenuOpen = false; },
  },
});

export const { toggleMobileMenu, openMobileMenu, closeMobileMenu } = MobileMenuSlice.actions;
export default MobileMenuSlice.reducer;