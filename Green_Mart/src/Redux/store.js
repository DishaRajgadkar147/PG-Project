import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartSlice";
import ordersReducer from "./ordersSlice";
import addressReducer from "./addressSlice";
import profileReducer from "./profileSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: ordersReducer,
    address: addressReducer,
    profile: profileReducer,
  },
});
