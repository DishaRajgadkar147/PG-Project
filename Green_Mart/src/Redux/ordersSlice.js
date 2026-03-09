import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    list: [],
  },
  reducers: {
    addOrder: (state, action) => {
      state.list.unshift(action.payload); // latest order on top
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
