import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './SidebarSlice';
import mobileMenuReducer from './MobileMenuSlice'; 
import globalReducer from './DarkModeSlice'

export const Store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    mobileMenu: mobileMenuReducer, 
    global: globalReducer,
  },
});