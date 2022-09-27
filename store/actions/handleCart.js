import axios from "axios";

export const UPLOAD_CART = "UPLOAD_CART";
export const CART = "CART";
export const IS_IN_CART = "IS_IN_CART";
export const EMPTY_CART = "EMPTY_CART";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_ERROR = "FETCH_ERROR";

export const handleSingleProduct = (cartAmount) => {
  return {
    type: UPLOAD_CART,
    cartAmount: cartAmount,
  };
};

export const handleCartProduct = (data) => {
  return {
    type: CART,
    cart: data,
  };
};

export const isInCart = () => {
  return {
    type: IS_IN_CART,
  };
};

export const emptyCart = () => {
  return {
    type: EMPTY_CART,
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
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

// fetch products in cart
export const fetchCart = (userID) => {
  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      const resp = await axios.get(
        `https://e-commerce-a1908-default-rtdb.europe-west1.firebasedatabase.app/Users/${userID}/Cart.json`
      );
      //if cart empty stop
      if (!resp) return;
      const data = await resp.data;
      dispatch(handleCartProduct(data));
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};

//upload Cart
export const fetchUploadCart = (counter, name, id, price, image, userID) => {
  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      const resp = await axios.get(
        `https://e-commerce-a1908-default-rtdb.europe-west1.firebasedatabase.app/Users/${userID}/Cart.json`
      );
      const cartData = await resp?.data;
      //if cart is empty upload direct
      if (!cartData) {
        const response = axios.post(
          `https://e-commerce-a1908-default-rtdb.europe-west1.firebasedatabase.app/Users/${userID}/Cart.json`,
          {
            product: name,
            id: id,
            price: price * counter,
            amount: counter,
            image: image,
          }
        );
      } else {
        const cart = Object.values(cartData);
        let arrayCart = [];
        cart.map((value) => {
          return arrayCart.push(value.product);
        });
        // stop if product is in cart
        if (arrayCart.includes(name)) {
          dispatch(isInCart());
        } else {
          const response = axios.post(
            `https://e-commerce-a1908-default-rtdb.europe-west1.firebasedatabase.app/Users/${userID}/Cart.json`,
            {
              product: name,
              id: id,
              price: price * counter,
              amount: counter,
              image: image,
            }
          );
        }
      }

      dispatch(fetchCartAmount(userID));
      dispatch(fetchCart(userID));
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};

// fetch the amount of cart
export const fetchCartAmount = (userID) => {
  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      const resp = await axios.get(
        `https://e-commerce-a1908-default-rtdb.europe-west1.firebasedatabase.app/Users/${userID}/Cart.json`
      );
      const data = resp.data;
      // if cart empty, no product and stop
      if (!data) {
        dispatch(handleSingleProduct(""));
        return;
      }
      const cartLength = Object.keys(data).length;
      dispatch(handleSingleProduct(cartLength));
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};

// remove single product to cart
export const fetchRemoveObject = (productName, userID) => {
  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      const resp = await axios.get(
        `https://e-commerce-a1908-default-rtdb.europe-west1.firebasedatabase.app/Users/${userID}/Cart.json`
      );
      //filter the exact product
      const data = resp.data;
      const arrObj = Object.entries(data).map((value) => value[1]);
      const boolArray = arrObj.map((value) => value["product"] === productName);
      const indexToRemove = boolArray.indexOf(true);
      const key = Object.keys(data)[indexToRemove];
      // remove product
      const del = await axios.delete(
        `https://e-commerce-a1908-default-rtdb.europe-west1.firebasedatabase.app/Users/${userID}/Cart/${key}.json`
      );
      dispatch(fetchCart(userID));
      dispatch(fetchCartAmount(userID));
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};

// complete the purchase
export const fetchDeleteCart = (userID) => {
  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      const del = await axios.delete(
        `https://e-commerce-a1908-default-rtdb.europe-west1.firebasedatabase.app/Users/${userID}/Cart.json`
      );
      dispatch(fetchCart(userID));
      dispatch(fetchCartAmount(userID));
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};
