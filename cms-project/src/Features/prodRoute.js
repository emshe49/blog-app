import { createSlice } from "@reduxjs/toolkit";

const rawBackendUrl = import.meta.env.VITE_BACKEND_URL;
const backendUrl =
  rawBackendUrl && rawBackendUrl.trim() !== ""
    ? rawBackendUrl.trim().replace(/\/+$/, "")
    : "http://localhost:5000";

const prodRoute = createSlice({
  name: "prod",
  initialState: {
    link: backendUrl,
  },
  reducers: {
    setBackendLink: (state, action) => {
      state.link = action.payload ? action.payload.trim().replace(/\/+$/, "") : state.link;
    },
  },
});

export const { setBackendLink } = prodRoute.actions;
export default prodRoute.reducer;

