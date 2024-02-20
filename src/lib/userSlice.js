import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  email: "",
  username: "",
  isVerified: false,
  isAdmin: false,
  auth: false,
};
export const userSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { _id, email, username, auth, isVerified, isAdmin } =
        action.payload;

      state._id = _id;
      state.email = email;
      state.username = username;
      state.isVerified = isVerified;
      state.isAdmin = isAdmin;
      state.auth = auth;
    },
    resetUser: (state) => {
      state._id = "";
      state.email = "";
      state.username = "";
      state.isVerified = isVerified;
      state.isAdmin = isAdmin;
      state.auth = false;
    },
  },
});
export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
