import axios from "axios";

export const HANDLE_ALL_ORDERS = "HANDLE_ALL_ORDERS";
export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_ERROR = "FETCH_ERROR";

export const handleAllOrders = (orders) => {
  return {
    type: HANDLE_ALL_ORDERS,
    orders: orders,
  };
};

export const fetchStart = () => {
  return {
    type: FETCH_START,
  };
};

export const fetchSuccess = () => {
  return {
    type: FETCH_SUCCESS,
  };
};

export const fetchError = (error) => {
  return {
    type: FETCH_ERROR,
    error,
  };
};

//upload in database order, date & final price
export const fetchUploadOrders = (order, userID, fullDate, totalPrice) => {
  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      const response = axios.post(
        `https://e-commerce-a1908-default-rtdb.europe-west1.firebasedatabase.app/Users/${userID}/Order.json`,
        {
          order,
          fullDate,
          totalPrice,
        }
      );
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};

//fetch all orders
export const fetchOrders = (userID) => {
  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      const response = await axios.get(
        `https://e-commerce-a1908-default-rtdb.europe-west1.firebasedatabase.app/Users/${userID}/Order.json`
      );
      const data = response.data;
      dispatch(handleAllOrders(data));
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};
