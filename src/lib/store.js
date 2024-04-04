import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice.js";
import { cartReducer } from "./reducers/cartReducer.js";
import { newReviewReducer } from "./reducers/productReducer.js";
let initialState = {
  cartItems: [], // Set default value for cartItems
};

// Check if window is defined before accessing localStorage
if (typeof window !== "undefined") {
  initialState = {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  };
}

export const makeStore = () => {
  return configureStore({
    reducer: { user, cart: cartReducer, newReview: newReviewReducer }, // Update reducer key
    preloadedState: { cart: initialState }, // Provide initial state directly
  });
};
