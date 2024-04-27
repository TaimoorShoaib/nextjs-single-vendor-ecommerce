export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_ORDER_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "UPDATE_ORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case "UPDATE_ORDER_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "UPDATE_ORDER_RESET":
      return {
        ...state,
        isUpdated: false,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case "ORDER_DETAILS_REQUEST":
      return {
        loading: true,
      };

    case "ORDER_DETAILS_SUCCESS":
      return {
        loading: false,
        order: action.payload,
      };

    case "ORDER_DETAILS_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
