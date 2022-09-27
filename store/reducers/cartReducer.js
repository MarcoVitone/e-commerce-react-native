import * as actionTypes from "../actions/handleCart";

const initialState = {
  cartAmount: 0,
  cart: {},
  isInCart: false,
  emptyCart: false,
  openModal: false,
  loading: false,
  error: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_CART: {
      return {
        ...state,
        cartAmount: action.cartAmount,
      };
    }
    case actionTypes.CART: {
      return {
        ...state,
        cart: action.cart,
      };
    }
    case actionTypes.IS_IN_CART: {
      return {
        ...state,
        isInCart: true,
      };
    }
    case actionTypes.EMPTY_CART: {
      return {
        ...state,
        emptyCart: true,
      };
    }
    case actionTypes.OPEN_MODAL: {
      return {
        ...state,
        openModal: true,
      };
    }
    case actionTypes.CLOSE_MODAL: {
      return {
        ...state,
        isInCart: false,
        emptyCart: false,
        closeModal: false,
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

export default cartReducer;
