import axios from "axios";

export const HANDLE_SUGGESTION = "HANDLE_SUGGESTION";
export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_ERROR = "FETCH_ERROR";

export const handleSuggestion = (data) => {
  return {
    type: HANDLE_SUGGESTION,
    suggestion: data,
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

//fetch suggestion
export const fetchSuggestion = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      const response = await axios.get(
        "https://e-commerce-a1908-default-rtdb.europe-west1.firebasedatabase.app/Suggerimenti.json"
      );
      const data = response.data;
      let suggenstions = [];
      for (key in data) {
        suggenstions.push(data[key]);
      }
      dispatch(handleSuggestion(data));
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};
