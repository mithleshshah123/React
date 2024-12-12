import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {

      //Vanilla(older) Redux => we don't have to mutate
      

      //Redux toolkit
      //We have to mutate
      state.items.push(action.payload);
    },
    removeItem: (state) => {
      state.items.pop();
    },
    clearCart: (state) => {
      state.items.length = 0;
    },
  },
});

export const {addItem, removeItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
