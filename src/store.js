import { createStore, compose } from "redux";
import rootReducer from "./reducers/RootReducer";
const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  window.devToolsExtension && window.devToolsExtension()
);
export default store;
