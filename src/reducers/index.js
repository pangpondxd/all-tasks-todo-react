import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { doneReducer } from './doneReducer'

const rootReducer = combineReducers({
  cart: cartReducer,
  done: doneReducer
});

export default rootReducer;