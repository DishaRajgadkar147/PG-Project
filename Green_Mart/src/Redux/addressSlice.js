import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    data: null,
  },
  reducers: {
    saveAddress: (state, action) => {
      state.data = action.payload;
    },
    clearAddress: (state) => {
      state.data = null;
    },
  },
});

export const { saveAddress, clearAddress } = addressSlice.actions;
export default addressSlice.reducer;
