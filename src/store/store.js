import { configureStore } from "@reduxjs/toolkit";

// Features
import userSlice from "./features/userSlice";
import ordersSlice from "./features/ordersSlice";
import productsSlice from "./features/productsSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    orders: ordersSlice,
    products: productsSlice,
  },
});
