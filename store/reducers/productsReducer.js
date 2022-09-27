import * as actionTypes from "../actions/handleProducts";

const initialState = {
  singleProduct: "",
  giacche: "",
  maglie: "",
  pantaloni: "",
  dataProducts: [],
  sectionName: "",
  loading: false,
  error: false,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_SINGLE_PRODUCT: {
      return {
        ...state,
        singleProduct: action.singleProduct,
      };
    }
    case actionTypes.HANDLE_HOME_PRODUCTS: {
      return {
        ...state,
        giacche: action.giacche,
        maglie: action.maglie,
        pantaloni: action.pantaloni,
      };
    }
    case actionTypes.HANDLE_ARTICLE_PRODUCTS: {
      return {
        ...state,
        dataProducts: action.dataProducts,
        sectionName: action.sectionName,
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

export default productsReducer;
