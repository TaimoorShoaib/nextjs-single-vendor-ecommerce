"use client";

import { setUser } from "../lib/userSlice";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useAutoLogin() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    (async function autoLoginApiCall() {
      try {
        const response = await axios.get("/api/users/refresh", {
          withCredentials: true,
        });
        if (response && response.status === 200) {
          // Set user
          const user = {
            _id: response.data.user._id,
            email: response.data.user.email,
            username: response.data.user.username,
            isVerified: response.data.user.isVerified,
            isAdmin: response.data.user.isAdmin,
            auth: response.data.auth,
          };
          dispatch(setUser(user));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return loading;
}
