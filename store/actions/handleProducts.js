import axios from "axios";

export const HANDLE_SINGLE_PRODUCT = "HANDLE_SINGLE_PRODUCT";
export const HANDLE_HOME_PRODUCTS = "HANDLE_HOME_PRODUCTS";
export const HANDLE_ARTICLE_PRODUCTS = "HANDLE_ARTICLE_PRODUCTS";
export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_ERROR = "FETCH_ERROR";

export const handleSingleProduct = (productsList) => {
  return {
    type: HANDLE_SINGLE_PRODUCT,
    singleProduct: productsList,
  };
};

export const handleHomeProducts = (giacche, maglie, pantaloni) => {
  return {
    type: HANDLE_HOME_PRODUCTS,
    giacche,
    maglie,
    pantaloni,
  };
};

export const handleArticleProducts = (dataProducts, sectionName) => {
  return {
    type: HANDLE_ARTICLE_PRODUCTS,
    dataProducts,
    sectionName,
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

//fetch single product
export const fetchSingleProduct = (product) => {
  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      // filter product for suggestion
      let section;
      if (product.startsWith("MAG")) {
        section = "Maglie";
      } else if (product.startsWith("FEL")) {
        section = "Maglie";
      } else if (product.startsWith("PAN")) {
        section = "Pantaloni";
      } else if (product.startsWith("GIA")) {
        section = "Giacche";
      } else {
        section = "";
      }
      const link = `https://e-commerce-a1908-default-rtdb.europe-west1.firebasedatabase.app/Articoli/${section}.json`;
      const response = await axios.get(link);
      const data = response.data;
      const list = [];
      for (key in data) {
        list.push(data[key]);
      }
      let element;
      for (let i = 0; i < list.length; i++) {
        if (list[i].Name === product) {
          element = list[i];
        }
      }
      dispatch(handleSingleProduct(element));
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};

// fetch images for section in HomeScreen
export const fetchImage = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      const response = await axios.get(
        `https://e-commerce-a1908-default-rtdb.europe-west1.firebasedatabase.app/Articoli.json`
      );
      const data = response.data;
      // create single image
      const giacche = Object.values(data.Giacche)[0].FirstImage;
      const maglie = Object.values(data.Maglie)[7].FirstImage;
      const pantaloni = Object.values(data.Pantaloni)[1].FirstImage;
      dispatch(handleHomeProducts(giacche, maglie, pantaloni));
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};

//fetch single section of article
export const fetchArticle = (article) => {
  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      const response = await axios.get(
        `https://e-commerce-a1908-default-rtdb.europe-west1.firebasedatabase.app/Articoli/${article}.json`
      );
      const data = response.data;
      const sectionName = article;
      const dataProducts = Object.values(data);
      dispatch(handleArticleProducts(dataProducts, sectionName));
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};
