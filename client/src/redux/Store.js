import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './SidebarSlice';
import mobileMenuReducer from './MobileMenuSlice';
import globalReducer from './DarkModeSlice';
import userReducer from './UserSlice';

export const Store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    mobileMenu: mobileMenuReducer,
    global: globalReducer,
    user: userReducer,
  },
});