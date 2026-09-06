import { createSlice } from "@reduxjs/toolkit";

const getInitialBackendUrl = () => {
  const rawBackendUrl = import.meta.env.VITE_BACKEND_URL;
  if (rawBackendUrl && rawBackendUrl.trim() !== "") {
    return rawBackendUrl.trim().replace(/\/+$/, "");
  }

  // When deployed in production or hosted domain, fallback to live Render backend
  if (
    import.meta.env.PROD ||
    (typeof window !== "undefined" &&
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1")
  ) {
    return "https://blog-app-36cw.onrender.com";
  }

  // Local development fallback
  return "http://localhost:5000";
};

const backendUrl = getInitialBackendUrl();

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

