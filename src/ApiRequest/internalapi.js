import axios from "axios";

const api = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
// user api calls
export const login = async (data) => {
  let response;

  try {
    response = await api.post("/api/users/login", data);
  } catch (error) {
    return error;
  }
  return response;
};
export const verifyEmailCart = async (id) => {
  let response;

  try {
    response = await api.post("/api/users/verifyEmailCart", { id });
  } catch (error) {
    return error;
  }
  return response;
};
export const signup = async (data) => {
  let response;

  try {
    response = await api.post("/api/users/signup", data);
  } catch (error) {
    return error;
  }
  return response;
};

export const signout = async () => {
  let response;

  try {
    response = await api.get("/api/users/logoutUser");
  } catch (error) {
    return error;
  }
  return response;
};

//update password
export const updatePassword = async (data) => {
  let response;

  try {
    response = await api.post("/api/users/updatePassword", data);
  } catch (error) {
    return error;
  }
  return response;
};
//update Profile
export const updateProfile = async (data) => {
  let response;

  try {
    response = await api.post("/api/users/updateProfile", data);
  } catch (error) {
    return error;
  }
  return response;
};

export const GetAllUsersAdmin = async () => {
  let response;

  try {
    response = await api.get("/api/users/getAllUsers");
  } catch (error) {
    return error;
  }
  return response;
};

// orders
export const getAllOrder = async (id) => {
  let response;

  try {
    response = await api.post("/api/order/getAllOrder", { id });
  } catch (error) {
    return error;
  }
  return response;
};
export const deleteOrder = async (data) => {
  let response;

  try {
    response = await api.delete("/api/order/deleteOrder", { data });
  } catch (error) {
    return error;
  }
  return response;
};
//get logged in user
// orders
export const getSingleOrder = async (id) => {
  let response;

  try {
    response = await api.post("/api/order/getSingleOrder", { id });
  } catch (error) {
    return error;
  }
  return response;
};
//delete user deleteUserAdmin
export const deleteUserAdmin = async (data) => {
  let response;

  try {
    response = await api.delete("/api/users/deleteUser", { data });
  } catch (error) {
    return error;
  }
  return response;
};
export const sendEmailForgotPassword = async (data) => {
  let response;

  try {
    response = await api.post("/api/users/forgotPassword", data);
  } catch (error) {
    return error;
  }
  return response;
};
export const VerifyForgotPasswordApi = async (data) => {
  let response;

  try {
    response = await api.post("/api/users/verifyForgotPassword", data);
  } catch (error) {
    return error;
  }
  return response;
};

// product api calls
export const GetAllProduct = async (data) => {
  let response;

  try {
    response = await api.post("/api/product/getAllProduct", data);
  } catch (error) {
    return error;
  }
  return response;
};
//delete user deleteUserAdmin
export const deleteProductAdmin = async (data) => {
  let response;

  try {
    response = await api.delete("/api/product/deleteProduct", { data });
  } catch (error) {
    return error;
  }
  return response;
};

//delete user updateUserAdmin
export const updateUserAdmin = async (data) => {
  let response;

  try {
    response = await api.post("/api/users/updateuser", data);
  } catch (error) {
    return error;
  }
  return response;
};

export const GetAllProductAdmin = async () => {
  let response;

  try {
    response = await api.get("/api/product/getAllProductAdmin");
  } catch (error) {
    return error;
  }
  return response;
};
export const GetProduct = async (id) => {
  let response;

  try {
    response = await api.post("/api/product/getProductById", { id });
  } catch (error) {
    return error;
  }
  return response;
};
export const GetAllProducts = async (data) => {
  let response;

  try {
    response = await api.post("/api/product/getAllProduct", data);
  } catch (error) {
    return error;
  }
  return response;
};

// reviews

export const PostReview = async (data) => {
  let response;

  try {
    response = await api.post("/api/reviews/createReview", data);
  } catch (error) {
    return error;
  }
  return response;
};

// order

export const CreateOrder = async (data) => {
  let response;

  try {
    response = await api.post("/api/order/createOrder", data);
  } catch (error) {
    return error;
  }
  return response;
};

export const getLogInUserOrder = async (id) => {
  let response;

  try {
    response = await api.post("/api/order/getloggedInUserOrder", { id });
  } catch (error) {
    return error;
  }
  return response;
};

export const getLogInUserOrderDetail = async (id) => {
  let response;

  try {
    response = await api.post("/api/order/getSingleOrder", { id });
  } catch (error) {
    return error;
  }
  return response;
};

// blalalallalallalalalsadijasoid
api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalReq = error.config;

    if (
      (error.response.status === 401 || error.response.status === 500) &&
      originalReq &&
      !originalReq._isRetry
    ) {
      originalReq._isRetry = true;

      try {
        // Call your refresh token endpoint
        await axios.get("/api/users/refresh", {
          withCredentials: true,
        });

        // Retry the original request with the updated access token
        return api(originalReq);
      } catch (refreshError) {
        // Handle the refresh error if needed
        throw refreshError;
      }
    }

    // If not a 401 or 500 error, pass through the error
    return Promise.reject(error);
  }
);
