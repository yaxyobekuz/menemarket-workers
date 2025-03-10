import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  data: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    updateOrders: (state, action) => {
      state.data = action.payload;
    },

    addOrder: (state, action) => {
      if (state.data) state.data.push(action.payload);
      else state.data = action.payload;
    },
  },
});

export const { updateOrders, addOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
