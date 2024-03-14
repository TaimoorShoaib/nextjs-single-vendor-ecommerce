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
export const signup = async (data) => {
  let response;

  try {
    response = await api.post("/api/users/signup", data);
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

export const GetProduct = async (id) => {
  let response;

  try {
    response = await api.post("/api/product/getProductById", { id });
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
