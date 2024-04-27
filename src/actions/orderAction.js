import axios from "axios";

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_ORDER_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/order/updateOrderStatus`,
      order,
      config
    );

    dispatch({ type: "UPDATE_ORDER_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "UPDATE_ORDER_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "ORDER_DETAILS_REQUEST" });

    const { data } = await axios.post(`/api/order/getSingleOrder`, { id });

    dispatch({ type: "ORDER_DETAILS_SUCCESS", payload: data.Order });
  } catch (error) {
    dispatch({
      type: "ORDER_DETAILS_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
