import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  email: "",
  username: "",
  auth: false,
  isAdmin: false,
  isVerified: false,
};
export const userSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { _id, email, username, auth, isAdmin, isVerified } =
        action.payload;
      state._id = _id;
      state.email = email;
      state.username = username;
      state.auth = auth;
      state.isAdmin = isAdmin;
      state.isVerified = isVerified;
    },
    resetUser: (state) => {
      state._id = "";
      state.email = "";
      state.username = "";
      state.auth = false;
      state.isAdmin = false;
      state.isVerified = false;
    },
  },
});
export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
