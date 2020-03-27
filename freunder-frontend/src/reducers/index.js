import { combineReducers } from "redux";
import authReducer from "./authReducer";
import eventReducer from "./eventReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  event: eventReducer,
  error: errorReducer
})