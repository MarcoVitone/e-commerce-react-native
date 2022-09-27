import * as actionTypes from "../actions/handleOrders";

const initialState = {
  orders: "",
  loading: false,
  error: false,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_ALL_ORDERS: {
      return {
        ...state,
        orders: action.orders,
      };
    }
    case actionTypes.FETCH_START: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case actionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }
    case actionTypes.FETCH_ERROR: {
      return {
        ...state,
        error: true,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default ordersReducer;
