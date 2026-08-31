import { createSlice } from "@reduxjs/toolkit";

const prodRoute = createSlice({
  name: "prod",
  initialState: {
    link: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
  },
});

export default prodRoute.reducer;
