import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice.js";
import { cartReducer } from "./reducers/cartReducer.js";
import {
  newProductReducer,
  newReviewReducer,
  productReducer,
} from "./reducers/productReducer.js";
import { orderReducer, orderDetailsReducer } from "./reducers/orderReducer.js";
let initialState = {
  cartItems: [], // Set default value for cartItems
};

// Check if window is defined before accessing localStorage
if (typeof window !== "undefined") {
  initialState = {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  };
}

export const makeStore = () => {
  return configureStore({
    reducer: {
      user,
      cart: cartReducer,
      newReview: newReviewReducer,
      newProduct: newProductReducer,
      order: orderReducer,
      orderDetails: orderDetailsReducer,
      product: productReducer,
    }, // Update reducer key
    preloadedState: { cart: initialState }, // Provide initial state directly
  });
};
