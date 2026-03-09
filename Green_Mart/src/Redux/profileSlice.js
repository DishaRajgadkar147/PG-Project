import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: {
      name: "Guest User",
      phone: "",
      email: "",
    },
  },
  reducers: {
    updateProfile: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
