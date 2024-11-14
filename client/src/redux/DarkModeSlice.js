import { createSlice } from "@reduxjs/toolkit";

const initialMode = localStorage.getItem("themeMode") || "light";

export const globalSlice = createSlice({
    name: "global",
    initialState: { mode: initialMode },
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
            localStorage.setItem("themeMode", state.mode);
        },
    },
});

export const { setMode } = globalSlice.actions;
export default globalSlice.reducer;
