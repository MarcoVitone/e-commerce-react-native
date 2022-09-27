import * as actionTypes from "../actions/handleSuggestion";

const initialState = {
  suggestions: [],
  loading: false,
  error: false,
};

const suggestionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_SUGGESTION: {
      return {
        ...state,
        suggestions: action.suggestion,
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

export default suggestionsReducer;
