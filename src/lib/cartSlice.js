import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  productName: "",
  price: 0,
  quantity: 0,
  status: "",
  image: "",
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      const { _id, productName, price, quantity, status, image } =
        action.payload;

      state._id = _id;
      state.productName = productName;
      state.price = price;
      state.quantity = quantity;
      state.status = status;
      state.image = image;
    },
    resetCart: (state) => {
      state._id = "";
      state.productName = "";
      state.price = 0;
      state.quantity = 0;
      state.status = "";
      state.image = "";
    },
  },
});
export const { setCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
