import { combineReducers } from "redux";
import suggestionsReducer from "./suggestionsReducer";
import productsReducer from "./productsReducer";
import cartReducer from "./cartReducer";
import authReducer from "./authReducer";
import ordersReducer from "./ordersReducer";

const rootReducer = combineReducers({
  suggestionsReducer,
  productsReducer,
  cartReducer,
  authReducer,
  ordersReducer,
});

export default rootReducer;
